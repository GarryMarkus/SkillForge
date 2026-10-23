import logging
import PyPDF2
from PyPDF2.errors import PdfReadError

logger = logging.getLogger(__name__)

PDF_MAGIC_BYTES = b"%PDF-"
MAX_EXTRACTED_CHARACTERS = 100_000


def extract_text_from_pdf_fileobj(file_field) -> str:
    """
    Safely extract readable text streams from a Django FileField containing a candidate PDF resume.
    Hardened against:
    - Non-PDF / corrupt binary streams (magic byte verification)
    - Resource exhaustion from decompressed text bombs (max characters limit)
    - File handle leaks (robust try/finally)
    """
    if not file_field:
        return ""

    text = ""
    try:
        file_field.open("rb")

        # Verify magic bytes before parsing with PyPDF2
        header = file_field.read(5)
        if not header.startswith(PDF_MAGIC_BYTES):
            logger.warning("Rejected file extraction: missing '%s' magic byte header.", PDF_MAGIC_BYTES.decode())
            return ""

        file_field.seek(0)
        reader = PyPDF2.PdfReader(file_field)

        for page in reader.pages:
            try:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
                    if len(text) >= MAX_EXTRACTED_CHARACTERS:
                        text = text[:MAX_EXTRACTED_CHARACTERS]
                        logger.warning("Truncated PDF extraction at max threshold of %d chars.", MAX_EXTRACTED_CHARACTERS)
                        break
            except Exception as page_err:
                logger.warning("Failed extracting text from page in PDF: %s", page_err)

    except PdfReadError as pdf_err:
        logger.warning("Corrupt or invalid PDF structure encountered: %s", pdf_err)
        text = ""
    except Exception as e:
        logger.warning("Unexpected error extracting text from PDF: %s", e)
        text = ""
    finally:
        try:
            file_field.close()
        except Exception:
            pass

    return text.strip()
