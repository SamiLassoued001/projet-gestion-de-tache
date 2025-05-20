import { useState, useEffect } from 'react';

const hours = Array.from({ length: 10 }, (_, i) => `${String(9 + i).padStart(2, '0')}:00`);

const getCurrentWeekDates = () => {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return {
      label: date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
      }),
      fullDate: date.toISOString().split('T')[0],
    };
  });
};

export default function WeeklyMeetingPlannerWithDates() {
  const [meetings, setMeetings] = useState({});
  const [weekDates, setWeekDates] = useState([]);
  const [editing, setEditing] = useState(null); // { date, hour, value }

  // Utiliser useEffect correctement à l'intérieur du composant
  useEffect(() => {
    setWeekDates(getCurrentWeekDates());
    fetchMeetingsFromDB(); // Appel pour récupérer les réunions
  }, []); // [] signifie que l'effet sera exécuté une fois au montage du composant

  // Fonction pour récupérer les réunions du backend
  const fetchMeetingsFromDB = async () => {
    try {
      const res = await fetch('http://localhost:5001/meetings');
      const data = await res.json();
      const formatted = {};
      data.forEach(({ date, hour, title }) => {
        formatted[`${date}-${hour}`] = title;
      });
      setMeetings(formatted);
    } catch (err) {
      console.error("Erreur lors du chargement des réunions :", err);
    }
  };

  // Fonction pour soumettre une réunion (ajouter ou modifier)
  const handleSubmitEdit = async () => {
    if (!editing) return;
    const { date, hour, value } = editing;
    const key = `${date}-${hour}`;

    try {
      if (value.trim() === '') {
        await handleDeleteMeeting(date, hour);
      } else {
        await fetch('http://localhost:5000/meetings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date, hour, title: value }),
        });
        setMeetings((prev) => ({ ...prev, [key]: value }));
      }
      setEditing(null);
    } catch (err) {
      console.error("Erreur lors de l'enregistrement :", err);
    }
  };

  // Fonction pour supprimer une réunion
  const handleDeleteMeeting = async (date, hour) => {
    const key = `${date}-${hour}`;
    try {
      await fetch('http://localhost:5001/meetings', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, hour }),
      });
      setMeetings((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
      if (editing?.date === date && editing?.hour === hour) {
        setEditing(null);
      }
    } catch (err) {
      console.error("Erreur suppression réunion :", err);
    }
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Heure</th>
            {weekDates.map(({ label, fullDate }) => (
              <th key={fullDate} style={styles.headerCell}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td style={styles.timeCell}><strong>{hour}</strong></td>
              {weekDates.map(({ fullDate }) => {
                const key = `${fullDate}-${hour}`;
                const isEditing = editing?.date === fullDate && editing?.hour === hour;
                const meeting = meetings[key];

                return (
                  <td key={key} 
// @ts-ignore
                  style={{ ...styles.cell, backgroundColor: meeting ? '#d1e7dd' : '#f8f9fa' }}>
                    {isEditing ? (
                      <div style={styles.editBox}>
                        <input
                          type="text"
                          value={editing.value}
                          onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                          autoFocus
                          style={styles.input}
                          placeholder="Nom de la réunion"
                        />
                        <div style={styles.buttonRow}>
                          <button onClick={handleSubmitEdit} style={styles.saveBtn}>✔</button>
                          <button onClick={() => setEditing(null)} style={styles.cancelBtn}>✖</button>
                        </div>
                      </div>
                    ) : (
                      <div 
// @ts-ignore
                      style={styles.meetingContent} onClick={() =>
                        setEditing({
                          date: fullDate,
                          hour,
                          value: meeting || '',
                        })
                      }>
                        {meeting || <span style={{ color: '#aaa' }}>+</span>}
                        {meeting && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteMeeting(fullDate, hour);
                            }}
                            // @ts-ignore
                            style={styles.deleteButton}
                            title="Supprimer"
                          >
                            ❌
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styles
const styles = {
  container: {
    overflowX: 'auto',
    padding: '20px',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    tableLayout: 'fixed',
  },
  headerCell: {
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: '#f1f1f1',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  timeCell: {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  cell: {
    border: '1px solid #ccc',
    padding: '6px',
    position: 'relative',
    textAlign: 'center',
    minHeight: '50px',
    cursor: 'pointer',
  },
  meetingContent: {
    position: 'relative',
    minHeight: '40px',
    padding: '4px',
    overflowWrap: 'break-word',
  },
  deleteButton: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    border: 'none',
    background: 'transparent',
    color: '#dc3545',
    cursor: 'pointer',
    fontSize: '14px',
  },
  editBox: {
    backgroundColor: 'white',
    padding: '6px',
    borderRadius: '6px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '6px',
    fontSize: '14px',
    marginBottom: '4px',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  saveBtn: {
    backgroundColor: '#198754',
    color: 'white',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};