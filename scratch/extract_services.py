import pdfplumber
import json
import os

pdf_path = r'c:\Github\BetterTuguegarao\abouttugue\deets.pdf'
output_path = r'c:\Github\BetterTuguegarao\scratch\extracted_services.json'

services = []

try:
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                # We'll just dump the raw text for now and then process it
                services.append({
                    "page": page.page_number,
                    "text": text
                })

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(services, f, indent=4)

    print(f"Extracted text from {len(services)} pages to {output_path}")

except Exception as e:
    print(f"Error: {e}")
