// Message de succès ou d'erreur. type = "success" | "error"
function StatusMessage({ type, message }) {
  if (!message) return null;
  return (
    <p className={`status-message ${type}`} role={type === "error" ? "alert" : "status"}>
      {message}
    </p>
  );
}

export default StatusMessage;
