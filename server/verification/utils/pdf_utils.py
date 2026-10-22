import logging
import PyPDF2

logger = logging.getLogger(__name__)


def extract_text_from_pdf_fileobj(file_field) -> str:
    """
    Extract readable text streams from a Django FileField containing a candidate PDF resume.
    Ensures safe file opening and closing.
    """
    text = ""
    try:
        file_field.open("rb")
        reader = PyPDF2.PdfReader(file_field)
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    except Exception as e:
        logger.warning(f"Error extracting text from PDF: {e}")
        text = f"Error extracting text: {str(e)}"
    finally:
        try:
            file_field.close()
        except Exception:
            pass
    return text.strip()
