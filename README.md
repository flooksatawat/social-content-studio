# Social Content Studio MVP

เว็บสำหรับสร้างกลยุทธ์ คอนเทนต์ SEO brief และภาพด้วย OpenAI API

## เปิดใช้งาน

ต้องใช้ Node.js 20 ขึ้นไป จากนั้นเปิดผ่าน local server:

```powershell
npm start
```

จากนั้นเข้า:

```text
http://127.0.0.1:4173/
```

คลิกสถานะ `เชื่อม AI` ที่มุมขวาบน แล้วใส่ OpenAI API key ระบบจะตรวจสอบคีย์และเก็บไว้ในหน่วยความจำของ server เท่านั้น คีย์จะไม่ถูกบันทึกลงไฟล์หรือ GitHub

อีกวิธีคือกำหนด environment variable ก่อนเปิด server:

```powershell
$env:OPENAI_API_KEY="sk-..."
npm start
```

## สิ่งที่ทำได้ใน MVP นี้

- วิเคราะห์ campaign brief และกลุ่มเป้าหมายด้วย AI
- รองรับ Facebook, YouTube, TikTok, LINE VOOM, Blog SEO และ AI Search
- สร้าง hook, caption, video script, SEO title, meta description, outline, FAQ และ entity facts
- สร้าง AI image prompt และภาพ PNG จริงด้วย GPT Image
- เลือกสัดส่วนภาพตามแพลตฟอร์มและปรับ mood ภาพ
- มี canvas preview สำรองก่อนสร้างภาพจริง
- เก็บประวัติชุดคอนเทนต์ล่าสุดใน localStorage
- ใช้งาน responsive บนมือถือ, tablet และ desktop

## ขั้นถัดไปที่ควรทำ

1. เพิ่มระบบ login และ workspace แยกตามแบรนด์
2. เพิ่ม database สำหรับเก็บ brand voice, campaign, media และ content calendar
3. ต่อ social OAuth ทีละแพลตฟอร์ม
4. ทำ scheduler + queue สำหรับโพสต์อัตโนมัติ
5. เพิ่ม analytics ingestion และ dashboard วิเคราะห์กลุ่มเป้าหมาย
