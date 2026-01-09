import { db, storage } from '../config/firebase.js';

export const createTextNote = async (req, res) => {
  try {
    const { title, subject, content, tags } = req.body;

    if (!title || !subject) {
      return res.status(400).json({ message: 'Title and subject are required' });
    }

    const noteData = {
      title,
      subject,
      content: content || '',
      type: 'text',
      tags: tags || [],
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    const noteRef = await db.collection('users').doc(req.user.uid)
      .collection('notes').add(noteData);

    res.status(201).json({
      success: true,
      note: {
        id: noteRef.id,
        ...noteData
      }
    });
  } catch (error) {
    console.error('Create text note error:', error);
    res.status(500).json({ message: 'Server error creating note' });
  }
};

export const uploadFileNote = async (req, res) => {
  try {
    const { title, subject, tags } = req.body;

    if (!title || !subject) {
      return res.status(400).json({ message: 'Title and subject are required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const bucket = storage.bucket();
    const fileName = `notes/${req.user.uid}/${Date.now()}_${req.file.originalname}`;
    const file = bucket.file(fileName);

    await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype
      }
    });

    await file.makePublic();
    const fileURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    const noteData = {
      title,
      subject,
      type: 'file',
      fileURL,
      fileName: req.file.originalname,
      filePath: fileName,
      size: req.file.size,
      tags: tags ? JSON.parse(tags) : [],
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    const noteRef = await db.collection('users').doc(req.user.uid)
      .collection('notes').add(noteData);

    res.status(201).json({
      success: true,
      note: {
        id: noteRef.id,
        ...noteData
      }
    });
  } catch (error) {
    console.error('Upload file note error:', error);
    res.status(500).json({ message: 'Server error uploading note' });
  }
};

export const getNotes = async (req, res) => {
  try {
    const { subject } = req.query;

    let notesQuery = db.collection('users').doc(req.user.uid).collection('notes');
    
    if (subject) {
      notesQuery = notesQuery.where('subject', '==', subject);
    }

    const snapshot = await notesQuery.orderBy('lastModified', 'desc').get();

    const notes = [];
    snapshot.forEach(doc => {
      notes.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      notes
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ message: 'Server error fetching notes' });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, subject, content, tags } = req.body;

    const noteRef = db.collection('users').doc(req.user.uid).collection('notes').doc(noteId);
    const noteDoc = await noteRef.get();

    if (!noteDoc.exists) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const noteData = noteDoc.data();

    if (noteData.type !== 'text') {
      return res.status(400).json({ message: 'Only text notes can be updated' });
    }

    const updateData = {
      lastModified: new Date().toISOString()
    };

    if (title) updateData.title = title;
    if (subject) updateData.subject = subject;
    if (content !== undefined) updateData.content = content;
    if (tags) updateData.tags = tags;

    await noteRef.update(updateData);

    const updatedDoc = await noteRef.get();

    res.json({
      success: true,
      note: {
        id: noteId,
        ...updatedDoc.data()
      }
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ message: 'Server error updating note' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const noteRef = db.collection('users').doc(req.user.uid).collection('notes').doc(noteId);
    const noteDoc = await noteRef.get();

    if (!noteDoc.exists) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const noteData = noteDoc.data();

    if (noteData.type === 'file' && noteData.filePath) {
      try {
        const bucket = storage.bucket();
        await bucket.file(noteData.filePath).delete();
      } catch (storageError) {
        console.error('Storage delete error:', storageError);
      }
    }

    await noteRef.delete();

    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ message: 'Server error deleting note' });
  }
};
