import pdfplumber

pdf_path = r'c:\Github\BetterTuguegarao\abouttugue\deets.pdf'

try:
    with pdfplumber.open(pdf_path) as pdf:
        print(f"Total pages: {len(pdf.pages)}")
        for i in range(min(10, len(pdf.pages))):
            page = pdf.pages[i]
            text = page.extract_text()
            if text:
                print(f"--- Page {i+1} ---")
                print(text[:500]) # Print first 500 characters of each page
                print("\n")

except Exception as e:
    print(f"Error: {e}")
