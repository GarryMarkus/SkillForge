import os
from django.core.exceptions import ValidationError

MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024  # 5 Megabytes
ALLOWED_PDF_MIME_TYPES = ("application/pdf", "application/x-pdf")
PDF_MAGIC_BYTES = b"%PDF-"


def validate_pdf_resume(file_obj):
    """
    Validate that an uploaded file is a genuine, safe PDF document:
    1. Enforces max size limit (5MB).
    2. Validates file extension is .pdf.
    3. Validates MIME type if provided by client/storage.
    4. Performs magic byte inspection on the file stream (must start with '%PDF-').
    """
    if not file_obj:
        return

    # 1. File Size Verification
    file_size = getattr(file_obj, "size", None)
    if file_size is not None and file_size > MAX_RESUME_SIZE_BYTES:
        raise ValidationError(
            f"File size ({round(file_size / (1024 * 1024), 2)}MB) exceeds maximum allowed threshold of 5MB."
        )

    # 2. File Extension Verification
    filename = getattr(file_obj, "name", "")
    if filename:
        ext = os.path.splitext(filename)[1].lower()
        if ext != ".pdf":
            raise ValidationError("Invalid file extension. Only genuine PDF documents (.pdf) are allowed.")

    # 3. MIME-Type Verification (if available)
    content_type = getattr(file_obj, "content_type", None)
    if content_type and content_type.lower() not in ALLOWED_PDF_MIME_TYPES:
        raise ValidationError(
            f"Invalid content type ({content_type}). Only PDF files (application/pdf) are permitted."
        )

    # 4. Magic Byte Inspection
    try:
        current_pos = file_obj.tell() if hasattr(file_obj, "tell") else 0
        if hasattr(file_obj, "seek"):
            file_obj.seek(0)

        header = file_obj.read(5) if hasattr(file_obj, "read") else b""

        # Restore seek position
        if hasattr(file_obj, "seek"):
            file_obj.seek(current_pos)

        if not header.startswith(PDF_MAGIC_BYTES):
            raise ValidationError(
                "Invalid PDF file header. The file does not appear to be a genuine PDF document."
            )
    except ValidationError:
        raise
    except Exception as e:
        raise ValidationError(f"Error inspecting file stream: {str(e)}")
