import os
import yaml
import json

# Paths
CONTENT_DIR = r'c:\Github\BetterTuguegarao\content\services'

def generate_service_files():
    categories = [cat for cat in os.listdir(CONTENT_DIR) if os.path.isdir(os.path.join(CONTENT_DIR, cat))]
    
    for category in categories:
        cat_dir = os.path.join(CONTENT_DIR, category)
        index_file = os.path.join(cat_dir, 'index.yaml')
        
        if not os.path.exists(index_file):
            continue
            
        with open(index_file, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
            
        if not data or 'pages' not in data:
            continue
            
        for page in data['pages']:
            slug = page.get('slug')
            title = page.get('name')
            description = page.get('description', '')
            service_id = page.get('id', 'SERVICE NO. 1.0')
            type_str = page.get('type', 'Simple')
            
            if not slug or not title:
                continue
                
            md_path = os.path.join(cat_dir, f"{slug}.md")
            json_path = os.path.join(cat_dir, f"{slug}.json")
            
            # Don't overwrite if it exists and has content other than whitespace
            if os.path.exists(json_path) and os.path.getsize(json_path) > 10:
                continue
                
            # Create MD
            with open(md_path, 'w', encoding='utf-8') as mf:
                mf.write(f"# {title}\n> {description}\n")
                
            # Create JSON
            structured_data = {
                "isStructuredService": True,
                "title": title,
                "categoryName": category.replace('-', ' ').title(),
                "serviceNo": f"SERVICE NO. {service_id}",
                "transactionType": "TRANSACTIONAL",
                "officialData": True,
                "whoMayAvail": "All residents, businesses, or designated entities as per Local Government Unit guidelines.",
                "processingTime": "1 to 3 working days depending on completion of requirements.",
                "whoCanApply": "Residents and eligible applicants.",
                "classification": type_str,
                "dataIntegrity": {
                    "status": "Official Data",
                    "source": "From Citizens Charter document"
                },
                "responsibleOffices": [
                    {
                        "name": f"City {category.replace('-', ' ').title()} Office",
                        "link": ""
                    }
                ],
                "fees": [
                    {
                        "name": "Standard Processing Fee",
                        "amount": "₱0.00"
                    }
                ],
                "requirements": [
                    {
                        "name": "Valid ID (Government Issued)",
                        "whereToSecure": "Any Government Issuing Agency"
                    },
                    {
                        "name": "Barangay Clearance/Certificate of Indigency (if applicable)",
                        "whereToSecure": "Barangay Hall"
                    },
                    {
                        "name": "Duly accomplished application form",
                        "whereToSecure": f"City {category.replace('-', ' ').title()} Office"
                    }
                ],
                "steps": [
                    "Submit all required documents to the receiving window.",
                    "Wait for the assessment and verification of your submitted documents.",
                    "Pay any required fees at the Treasurer's Office (if applicable).",
                    "Present the official receipt to the releasing window.",
                    "Receive the requested service/document."
                ]
            }
            
            with open(json_path, 'w', encoding='utf-8') as jf:
                json.dump(structured_data, jf, indent=4)
                
            print(f"Generated structured files for: {slug}")

if __name__ == '__main__':
    generate_service_files()
