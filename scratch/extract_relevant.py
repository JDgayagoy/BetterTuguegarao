import pdfplumber
import json

pdf_path = r'c:\Github\BetterTuguegarao\abouttugue\deets.pdf'
output_path = r'c:\Github\BetterTuguegarao\scratch\relevant_pages.json'

# Let's try to extract pages around the ones mentioned in TOC and some earlier ones
target_pages = [9, 10, 238, 239, 241, 284, 285, 286, 289, 290]

# Also let's just extract a range to see more
extended_range = list(range(230, 301))

all_pages_to_extract = sorted(list(set(target_pages + extended_range)))

extracted_data = []

try:
    with pdfplumber.open(pdf_path) as pdf:
        total_pages = len(pdf.pages)
        print(f"Total pages: {total_pages}")
        
        for p_num in all_pages_to_extract:
            if 0 <= p_num < total_pages:
                page = pdf.pages[p_num]
                text = page.extract_text()
                if text:
                    extracted_data.append({
                        "page": p_num + 1,
                        "text": text
                    })
        
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(extracted_data, f, indent=4)
        
    print(f"Successfully extracted {len(extracted_data)} pages.")

except Exception as e:
    print(f"Error: {e}")
