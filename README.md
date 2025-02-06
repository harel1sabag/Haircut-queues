# מערכת תורים לספרות

## דרישות מקדימות
- Python 3.8+
- pip

## התקנה
1. צור סביבת וירטואלית:
```bash
python -m venv venv
source venv/bin/activate  # על Windows: venv\Scripts\activate
```

2. התקן תלות:
```bash
pip install -r requirements.txt
```

3. הפעל את האפליקציה:
```bash
python run.py
```

## תכונות
- קביעת תורים עבור לקוחות
- ניהול תורים למנהלים
- עיצוב רספונסיבי
- תמיכה בעברית

## הערות
- מומלץ לשנות את מפתח הסוד בקובץ `__init__.py`
- המערכת משתמשת במסד נתונים SQLite לדוגמה
