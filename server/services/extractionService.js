import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import axios from 'axios';

export const extractTextFromPDF = async (fileUrl) => {
  try {
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const data = await pdfParse(response.data);
    return data.text;
  } catch (error) {
    throw new Error('Failed to extract text from PDF: ' + error.message);
  }
};

export const extractTextFromDOCX = async (fileUrl) => {
  try {
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const result = await mammoth.extractRawText({ buffer: response.data });
    return result.value;
  } catch (error) {
    throw new Error('Failed to extract text from DOCX: ' + error.message);
  }
};

export const extractText = async (fileUrl, mimetype) => {
  if (mimetype === 'application/pdf') {
    return await extractTextFromPDF(fileUrl);
  } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || mimetype === 'application/msword') {
    return await extractTextFromDOCX(fileUrl);
  } else {
    throw new Error('Unsupported file format');
  }
};
