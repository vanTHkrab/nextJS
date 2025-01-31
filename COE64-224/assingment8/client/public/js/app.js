document.addEventListener('DOMContentLoaded', function () {
    fetchClinics().then(r => console.log('Doctors fetched'));
});

const fetchClinics = async () => {
    await fetch('http://localhost:3000/clinic/doctors')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Doctors fetched:', data.doctors);
                const doctorsList = document.getElementById('doctorsList');
                data.doctors.forEach(doctor => {
                    const doctorCard = document.createElement('div');
                    doctorCard.className = `bg-white shadow-md rounded-lg p-4 text-center transition-transform transform hover:scale-105 hover:shadow-lg hover:ring-2 ring-rose-300`;

                    doctorCard.innerHTML = `
                        <img src="${doctor.image}" alt="${doctor.name}" class="w-full h-40 object-cover">
                        <div class="p-4">
                        <h3 class="font-bold text-l">${doctor.name}</h3>
                        <p class="text-gray-600">${doctor.specialty}</p>
                        </div>
                        `;
                    doctorsList.appendChild(doctorCard);

                });
            }
        })
        .catch(error => {
            console.error('Error fetching doctors:', error);
        });
}