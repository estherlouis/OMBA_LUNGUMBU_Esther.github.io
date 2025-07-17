document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('paymentForm');
  const tableBody = document.querySelector('#paymentsTable tbody');

  // Charger les paiements sauvegardés
  const loadPayments = () => {
    const payments = JSON.parse(localStorage.getItem('iscPayments') || '[]');
    tableBody.innerHTML = '';

    payments.forEach((payment, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${payment.name}</td>
        <td>${payment.amount} CDF</td>
        <td>${payment.date}</td>
        <td><button class="delete-btn" data-index="${index}">Supprimer</button></td>
      `;
      tableBody.appendChild(row);
    });

    // Attacher les événements de suppression
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', e => {
        const idx = e.target.getAttribute('data-index');
        deletePayment(idx);
      });
    });
  };

  // Supprimer un paiement
  const deletePayment = (index) => {
    const payments = JSON.parse(localStorage.getItem('iscPayments') || '[]');
    payments.splice(index, 1);
    localStorage.setItem('iscPayments', JSON.stringify(payments));
    loadPayments();
  };

  // Sauvegarder un nouveau paiement
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('agentName').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const date = new Date().toLocaleDateString('fr-FR');

    if (name && amount) {
      const newPayment = { name, amount, date };
      const payments = JSON.parse(localStorage.getItem('iscPayments') || '[]');
      payments.push(newPayment);
      localStorage.setItem('iscPayments', JSON.stringify(payments));
      form.reset();
      loadPayments();
    }
  });

  loadPayments();
});
