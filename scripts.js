document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('cashFlowChart').getContext('2d');
    const cashFlowChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Checking Balance',
                    data: [200000, 400000, 500000, 300000, 700000, 900000],
                    backgroundColor: '#1e90ff'
                },
                {
                    label: 'Income',
                    data: [300000, 500000, 600000, 400000, 800000, 1000000],
                    backgroundColor: '#32cd32'
                },
                {
                    label: 'Expenses',
                    data: [100000, 200000, 300000, 400000, 500000, 600000],
                    backgroundColor: '#ff6347'
                },
                {
                    label: 'Liabilities',
                    data: [50000, 100000, 150000, 200000, 250000, 300000],
                    backgroundColor: '#ff8c00'
                },
                {
                    label: 'Investment',
                    data: [150000, 250000, 350000, 450000, 550000, 650000],
                    backgroundColor: '#1e90ff'
                },
                {
                    label: 'Tax',
                    data: [20000, 40000, 60000, 80000, 100000, 120000],
                    backgroundColor: '#ff1493'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const toggleButton = document.getElementById('toggle-dark-mode');
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        toggleButton.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
    });
});
