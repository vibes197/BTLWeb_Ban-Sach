import os
import re

def strip_js_comments(text):
    pattern = re.compile(
        r'(?P<string>(?:"(?:\\.|[^"\\])*")|(?:\'(?:\\.|[^\'\\])*\')|(?:`(?:\\.|[^`\\])*`))|'
        r'(?P<block_comment>/\*.*?\*/)|'
        r'(?P<line_comment>//[^\r\n]*)',
        re.DOTALL
    )
    
    def replacer(match):
        if match.group('string') is not None:
            return match.group('string')
        else:
            return ''
            
    return pattern.sub(replacer, text)

def strip_css_comments(text):
    return re.sub(r'/\*.*?\*/', '', text, flags=re.DOTALL)

def strip_html(text):
    text = re.sub(r'<!--.*?-->', '', text, flags=re.DOTALL)
    
    def script_replacer(match):
        attrs = match.group(1)
        script_content = match.group(2)
        stripped = strip_js_comments(script_content)
        return f"<script{attrs}>{stripped}</script>"
        
    text = re.sub(r'<script([^>]*)>(.*?)</script>', script_replacer, text, flags=re.DOTALL | re.IGNORECASE)
    
    def style_replacer(match):
        attrs = match.group(1)
        style_content = match.group(2)
        stripped = strip_css_comments(style_content)
        return f"<style{attrs}>{stripped}</style>"
        
    text = re.sub(r'<style([^>]*)>(.*?)</style>', style_replacer, text, flags=re.DOTALL | re.IGNORECASE)
    
    return text

def main():
    root_dir = '.'
    for subdir, dirs, files in os.walk(root_dir):
        if '.git' in subdir or 'node_modules' in subdir or '.vscode' in subdir:
            dirs[:] = []
            continue
            
        for file in files:
            path = os.path.join(subdir, file)
            ext = os.path.splitext(file)[1].lower()
            if ext in ['.js', '.css', '.html']:
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    if ext == '.js':
                        new_content = strip_js_comments(content)
                    elif ext == '.css':
                        new_content = strip_css_comments(content)
                    elif ext == '.html':
                        new_content = strip_html(content)
                        
                    if content != new_content:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated {path}")
                except Exception as e:
                    pass

if __name__ == '__main__':
    main()
