# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 1. Backend Won't Start

**Error: "Cannot find module"**
```bash
cd backend
npm install
```

**Error: "Port 5000 already in use"**
- Option A: Kill the process using port 5000
- Option B: Change port in `backend/.env`:
```
PORT=5001
```
Then update frontend API URL in `frontend/src/utils/api.js`:
```javascript
const API_URL = 'http://localhost:5001/api';
```

### 2. Frontend Won't Start

**Error: "Dependencies not installed"**
```bash
cd frontend
npm install
```

**Error: "Port 3000 already in use"**
- The terminal will ask if you want to use another port
- Type 'Y' and press Enter
- It will use port 3001 automatically

### 3. Login/Signup Not Working

**Check:**
1. Backend server is running (Terminal should show "🎮 ArcadeHub Server running on port 5000")
2. No CORS errors in browser console (F12)
3. Network tab shows API calls going to correct URL

**Solution:**
- Restart both servers
- Clear browser cache
- Check browser console for errors

### 4. Games Not Saving Scores

**Symptoms:**
- Games work but scores don't appear in dashboard
- Leaderboard is empty

**Check:**
1. You're logged in (token exists)
2. Backend console for errors
3. `backend/data/` folder exists

**Solution:**
```bash
# Create data folder if missing
cd backend
mkdir data
```

### 5. Styling Issues

**Symptoms:**
- No colors/animations
- Layout broken
- Fonts not loading

**Solution:**
- Hard refresh: Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)
- Clear browser cache
- Check browser console for CSS errors

### 6. API Connection Failed

**Error in console: "Network Error" or "ERR_CONNECTION_REFUSED"**

**Check:**
1. Backend is running
2. Backend URL is correct in `frontend/src/utils/api.js`
3. No firewall blocking localhost

**Solution:**
```bash
# Restart backend
cd backend
npm start
```

### 7. Authentication Token Issues

**Symptoms:**
- Logged out unexpectedly
- "Invalid token" errors
- Can't access protected pages

**Solution:**
```javascript
// Clear localStorage in browser console (F12)
localStorage.clear();
// Then login again
```

### 8. Data Not Persisting

**Symptoms:**
- Users/scores disappear after restart

**Check:**
- `backend/data/` folder has .json files
- Files have proper permissions

**Solution:**
```bash
cd backend/data
# Check if files exist
dir  # Windows
ls   # Mac/Linux

# If missing, they'll be created automatically on first use
```

### 9. React Router Issues

**Symptoms:**
- Blank page
- Routes not working
- 404 errors

**Solution:**
- Check browser URL is correct
- Ensure you're accessing http://localhost:3000 (not file://)
- Check console for routing errors

### 10. Build Errors

**Error during npm install:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rmdir /s node_modules  # Windows
rm -rf node_modules    # Mac/Linux

npm install
```

---

## Quick Diagnostics

### Check Backend Health
```bash
# In browser or Postman
GET http://localhost:5000/api/auth/login
# Should return 400 (not 404) - means server is running
```

### Check Frontend Health
```
Open http://localhost:3000
# Should see landing page, not blank screen
```

### Check Browser Console
```
Press F12
Look for red errors
Common issues:
- CORS errors → Backend not running
- 404 errors → Wrong API URL
- Token errors → Need to login again
```

---

## Performance Issues

### Slow Loading
1. Check internet connection (for Google Fonts)
2. Reduce animations in CSS if needed
3. Clear browser cache

### High Memory Usage
- Normal for development mode
- Production build will be optimized

---

## Development Tips

### Hot Reload Not Working
```bash
# Restart frontend
Ctrl + C (stop)
npm start
```

### Changes Not Showing
1. Hard refresh: Ctrl + Shift + R
2. Check if you saved the file
3. Check terminal for compilation errors

### Database Reset
```bash
# Delete all data and start fresh
cd backend/data
del *.json  # Windows
rm *.json   # Mac/Linux

# Files will be recreated automatically
```

---

## Browser Compatibility

**Recommended Browsers:**
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

**Not Supported:**
- Internet Explorer

---

## Getting Help

### Check These First:
1. ✅ Both servers running?
2. ✅ Correct URLs?
3. ✅ Browser console errors?
4. ✅ Dependencies installed?

### Debug Mode:
```javascript
// Add to any component to debug
console.log('Debug:', variableName);
```

### Network Debugging:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try the action again
4. Check API calls (red = failed)

---

## Still Having Issues?

1. **Restart Everything:**
   - Close all terminals
   - Close browser
   - Run `start.bat` again

2. **Fresh Install:**
   ```bash
   # Backend
   cd backend
   rmdir /s node_modules
   npm install
   
   # Frontend
   cd frontend
   rmdir /s node_modules
   npm install
   ```

3. **Check File Paths:**
   - Ensure you're in correct directory
   - Check for typos in file names

4. **Environment:**
   - Windows 10/11 recommended
   - Node.js 14+ required
   - npm 6+ required

---

## Prevention Tips

✅ Always run both servers
✅ Don't modify package.json unless needed
✅ Keep dependencies updated
✅ Use recommended browsers
✅ Don't delete data files while server running
✅ Save files before testing changes

---

**Most issues are solved by restarting both servers! 🔄**
