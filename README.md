# Social Content Studio MVP

เว็บต้นแบบสำหรับทดสอบการสร้างคอนเทนต์และภาพตัวอย่างก่อนเชื่อม API จริง

## เปิดใช้งาน

เปิดผ่าน local server:

```powershell
node C:\Users\sataw\Documents\Codex\2026-06-22\vpkd\work\social-content-studio-server.js
```

จากนั้นเข้า:

```text
http://127.0.0.1:4173/
```

หรือเปิดไฟล์ `index.html` โดยตรงในเบราว์เซอร์ทั่วไปก็ได้

## สิ่งที่ทำได้ใน MVP นี้

- สร้าง content pack จาก campaign brief
- รองรับ Facebook, YouTube, TikTok, LINE VOOM, Blog SEO และ AI Search
- สร้าง hook, caption, video script, SEO title, meta description, outline, FAQ และ entity facts
- สร้าง AI image prompt สำหรับส่งต่อให้ image model
- สร้างภาพตัวอย่างจาก canvas และดาวน์โหลดเป็น PNG
- เก็บประวัติชุดคอนเทนต์ล่าสุดใน localStorage
- ใช้งาน responsive บนมือถือ, tablet และ desktop

## ขั้นถัดไปที่ควรทำ

1. เชื่อม AI text generation API จริง
2. เชื่อม image generation API จริง
3. เพิ่มระบบ login และ workspace แยกตามแบรนด์
4. เพิ่ม database สำหรับเก็บ brand voice, campaign, media และ content calendar
5. ต่อ social OAuth ทีละแพลตฟอร์ม
6. ทำ scheduler + queue สำหรับโพสต์อัตโนมัติ
7. เพิ่ม analytics ingestion และ dashboard วิเคราะห์กลุ่มเป้าหมาย
