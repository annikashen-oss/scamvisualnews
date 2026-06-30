/* ===== 手機撥號動畫 ===== */
.shake-active {
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-12px); }
  75% { transform: translateX(12px); }
}

.slide-in-entry {
  animation: slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes slideIn {
  0% { transform: scale(0.8) translateY(40px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}

.slide-up-exit {
  animation: slideUp 0.5s ease-in forwards;
}

@keyframes slideUp {
  0% { transform: scale(1) translateY(0); opacity: 1; }
  100% { transform: scale(0.9) translateY(-40px); opacity: 0; }
}
