## 🔁 PHASE 2: Refactored Barber Onboarding (Wizard Flow)

> Replaces old flow: Register → Dashboard

- [ ] **Step 1:** Register Barber (name, email, password)
- [ ] **Step 2:** Auto-assign unique Twilio number  
  - Purchase number via Twilio API  
  - Save to `barber.phoneNumber`  
  - Display in confirmation screen
- [ ] **Step 3:** AI Assistant Setup  
  - Ask: "Do you want AI to handle your calls?"  
  - Save `barber.aiEnabled: true`  
  - Set up `/twilio/voice/:barberId` route
- [ ] **Step 4:** Set Weekly Availability  
  - Create time selector UI  
  - Save to MongoDB: `barber.availability`
- [ ] **Step 5:** Redirect to Dashboard on completion

---

## 🧠 PHASE 3: AI Voice Assistant

- [ ] Integrate OpenAI Whisper API to transcribe voice
- [ ] Use GPT-4o to interpret and respond to client questions
- [ ] Return AI-generated reply to Twilio via TwiML
- [ ] If barber is unavailable, log message + intent to dashboard

---

## ⚠️ PHASE 4: Bug Fixes (Critical)

- [ ] **Fix Login 405 Error**  
  - Ensure POST method accepted on `/api/auth/login`  
  - Use `express.json()` middleware  
  - Return valid JSON to avoid "Unexpected end of JSON input"
- [ ] **Fix Twilio Voice Call Error**  
  - "Application error" → likely TwiML issue  
  - Verify valid TwiML returned from `/twilio/voice/:barberId`  
  - Check webhook configuration in Twilio Console

---

## 📊 PHASE 5: Dashboard Enhancements

- [ ] Add **Income Tracker** tab  
  - Form inputs: Service, Amount, Date  
  - Weekly/monthly totals  
  - Optional: CSV export
- [ ] Move **Profile Dropdown** to top-right corner (modern UX)
- [ ] Add **"Features" tab** to sidebar  
  - Describe core features, changelogs, AI settings, etc.
- [ ] Improve Mobile Experience  
  - Hamburger menu toggle for sidebar  
  - Stack layout for smaller screens

---

## 💬 PHASE 6: WhatsApp Integration (Optional)

- [ ] Allow barber to link WhatsApp number in profile
- [ ] Connect to WhatsApp API (Meta or Twilio Sandbox)
- [ ] Use WhatsApp bot to respond to client messages (optional AI)

---

## 🚀 PHASE 7: Deployment & Scaling

- [ ] Deploy backend on **Render**
- [ ] Deploy frontend on **Vercel**
- [ ] Test entire flow:
  - Register → Twilio number assigned → AI answers call → Dashboard updates
- [ ] Scaling plan for 100–10,000 barbers:
  - Unique Twilio numbers per barber  
  - MongoDB indexes on `barberId`, `phoneNumber`, `email`  
  - Monitor logs (Twilio Console, Render)

---

## 💰 PHASE 8: Monetization Features

- [ ] Integrate Stripe billing (monthly subscriptions)
- [ ] Lock premium features:
  - AI Assistant: $15/month  
  - Custom voice: +$5/month  
  - Analytics export: +$5/month
- [ ] Add `barber.isPaid` flag to enable/disable premium tools

---

## ✅ FINAL CHECKLIST SUMMARY

### 🔵 Must-Fix Immediately
- [ ] Fix login error (405)
- [ ] Fix Twilio voice call error
- [ ] Build Twilio auto-assignment logic in register route
- [ ] Setup onboarding wizard (Twilio → AI → Availability)

### 🟡 High Priority
- [ ] AI voice response (Whisper + GPT-4o)
- [ ] Dashboard income tracking
- [ ] Profile dropdown and Features tab

### 🟠 Optional (Nice to Have)
- [ ] WhatsApp integration
- [ ] Stripe monetization and access control

### 🟣 Deployment
- [ ] Deploy backend/frontend to Render/Vercel
- [ ] Full test: registration → AI → SMS → dashboard sync

---

> 💡 Suggestion: Consider tracking this checklist in Notion, Trello, or GitHub Projects for easier sprint management.
