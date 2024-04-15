
const checkFileType = (file, cb) => {
    
    const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Allowed filetypes are jpeg, jpg, png, gif, pdf, doc, docx');
    }
};
  
module.exports = checkFileType;
