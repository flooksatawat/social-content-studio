# Content Studio

เว็บสำหรับสร้างคอนเทนต์ประกันชีวิตและที่ปรึกษาทางการเงินมืออาชีพ รองรับ Facebook, YouTube, TikTok, LINE VOOM, Blog SEO และ AI Search

## ใช้งานบนเครื่อง

ต้องใช้ Node.js 20 ขึ้นไป แล้วเปิด local backend:

```powershell
npm start
```

จากนั้นเข้า:

```text
http://127.0.0.1:4173/
```

คลิกสถานะ `เชื่อม Gemini` ที่มุมขวาบน แล้วใส่ Gemini API key จาก Google AI Studio ระบบจะตรวจสอบคีย์และเก็บไว้ในไฟล์ `.env` บนเครื่องนี้เท่านั้น

## ทดสอบเว็บจริงกับ backend ในเครื่อง

สามารถเปิด frontend บน GitHub Pages แล้วให้เรียก backend ในเครื่องผ่าน tunnel ได้ด้วย query string:

```text
https://flooksatawat.github.io/social-content-studio/?api=https://your-tunnel-domain.example
```

frontend จะส่งคำขอ `/api/*` ไปยัง backend URL ที่ใส่ใน `api=...`

## ฟีเจอร์ปัจจุบัน

- สร้าง campaign brief สำหรับประกันชีวิตและที่ปรึกษาทางการเงิน
- ให้ AI ช่วยคิดกลยุทธ์ hooks, caption, script, Blog SEO และ AI Search brief
- สร้าง image prompt สำหรับงานสายการเงินที่ดูน่าเชื่อถือ
- รองรับ canvas preview และดาวน์โหลด PNG
- ถ้า Gemini Image ติด quota ระบบจะใช้ภาพสำรองจาก canvas แทน
- เก็บประวัติชุดคอนเทนต์ล่าสุดใน browser
- ใช้งาน responsive บนมือถือ, iPad/tablet และคอมพิวเตอร์

## หมายเหตุเรื่อง Gemini

Gemini text model อาจใช้งานได้ตาม free tier/โควตาของ Google แต่ Gemini image model อาจต้องมี billing หรือ quota แยกตาม project/API key ถ้าภาพติด quota เว็บจะยังไม่ล้ม และจะใช้ภาพ preview สำรองแทน

## ขั้นถัดไป

1. เพิ่มระบบ workspace แยกตามแบรนด์หรือตัวแทน
2. เพิ่ม content calendar และ scheduler
3. เชื่อม social OAuth สำหรับโพสต์จริง
4. เพิ่ม analytics dashboard สำหรับวิเคราะห์กลุ่มเป้าหมาย
5. เพิ่ม compliance checklist สำหรับคอนเทนต์ประกันชีวิตและการเงิน
