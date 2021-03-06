import { Subject } from './subject';
import { Event } from './base-event';

export interface TicketCreatedEvent extends Event {
    subject: Subject.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
        version: number;
    };
}