const map = {
    'А': 'A', 'а': 'a',
    'Б': '6', 'б': '6',
    'В': 'B', 'в': 'B',
    'Г': '', 'г': '',
    'Д': '', 'д': '',
    'Е': '', 'е': '',
    'Ё': '', 'ё': '',
}

const cyrillicToLatinDumbTranslit = (cyrillicText) => {
    return cyrillicText
        .split('')
        .map(char => map[char] ? map[char] : char)
        .join('')
}