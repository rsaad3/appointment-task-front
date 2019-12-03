export class DoctorAppointment2 {
    
    constructor(
        public name: string,
        public email: string,
        public starteWork: Date,
        public endWork: Date,
        public appointments: [],
        public ticketPrice: number,
        public startHours : number,
        public endDate : number,
    ) { }
}
