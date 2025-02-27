document.addEventListener('DOMContentLoaded', () => {
    // Sample data for recent activity
    const recentActivities = [
        {
            type: 'donation',
            icon: 'fa-gift',
            color: '#F97316',
            title: 'New Donation Received',
            description: '$500 donated to Hope Elementary School',
            time: '5 minutes ago'
        },
        {
            type: 'institution',
            icon: 'fa-building',
            color: '#7C3AED',
            title: 'New Institution Registered',
            description: 'City Food Bank submitted verification documents',
            time: '1 hour ago'
        },
        {
            type: 'user',
            icon: 'fa-user',
            color: '#14B8A6',
            title: 'New User Registration',
            description: 'John Doe joined as a donor',
            time: '2 hours ago'
        }
    ];

    // Render recent activities
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        recentActivities.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-icon" style="color: ${activity.color}">
                    <i class="fas ${activity.icon}"></i>
                </div>
                <div class="activity-details">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                    <small style="color: var(--text)">${activity.time}</small>
                </div>
            `;
            activityList.appendChild(activityItem);
        });
    }

    // Sample data for donation trends
    const donationData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        donations: [1200000, 1500000, 1800000, 1600000, 2100000, 2200000]
    };

    // Simple chart rendering (in practice, you would use a proper charting library like Chart.js)
    const chartContainer = document.getElementById('donation-chart');
    if (chartContainer) {
        const maxDonation = Math.max(...donationData.donations);
        const chartHtml = `
            <div style="display: flex; justify-content: space-between; align-items: flex-end; height: 100%;">
                ${donationData.donations.map((donation, index) => `
                    <div style="flex: 1; text-align: center;">
                        <div style="height: ${(donation / maxDonation) * 200}px; 
                                  background: var(--primary); 
                                  margin: 0 4px; 
                                  border-radius: 4px;">
                        </div>
                        <div style="margin-top: 8px;">${donationData.labels[index]}</div>
                    </div>
                `).join('')}
            </div>
        `;
        chartContainer.innerHTML = chartHtml;
    }

    // Event Listeners for Sidebar Navigation
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real application, this would handle navigation between different admin views
            document.querySelectorAll('.sidebar-menu a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Add hover effects to dashboard cards
    document.querySelectorAll('.dashboard-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
