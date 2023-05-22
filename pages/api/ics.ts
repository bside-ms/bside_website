import type { NextApiRequest, NextApiResponse } from 'next';
import formatDate from '../../lib/common/helper/formatDate';
import isEmptyString from '../../lib/common/helper/isEmptyString';
import getPayloadResponse from '../../lib/payload/getPayloadResponse';
import type PaginatedDocs from '../../types/payload/PaginatedDocs';
import type { Event } from '../../types/payload/payload-types';

const createIcsFile = (event: Event): string => {

    let ics =
        // Calendar
        'BEGIN:VCALENDAR\r\n' +
        'VERSION:2.0\r\n' +
        'PRODID:-//B-Side//DE\r\n' +
        'CALSCALE:GREGORIAN\r\n' +

        // Time Zone Information
        'BEGIN:VTIMEZONE\r\n' +
        'TZID:Europe/Berlin\r\n' +
        'TZURL:http://tzurl.org/zoneinfo-outlook/Europe/Berlin\r\n' +
        'X-LIC-LOCATION:Europe/Berlin\r\n' +
        'BEGIN:DAYLIGHT\r\n' +
        'TZOFFSETFROM:+0100\r\n' +
        'TZOFFSETTO:+0200\r\n' +
        'TZNAME:CEST\r\n' +
        'DTSTART:19700329T020000\r\n' +
        'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\n' +
        'END:DAYLIGHT\r\n' +
        'BEGIN:STANDARD\r\n' +
        'TZOFFSETFROM:+0200\r\n' +
        'TZOFFSETTO:+0100\r\n' +
        'TZNAME:CET\r\n' +
        'DTSTART:19701025T030000\r\n' +
        'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\n' +
        'END:STANDARD\r\n' +
        'END:VTIMEZONE\r\n' +

        // Event
        'BEGIN:VEVENT\r\n';

    const eventEnd = new Date(event.eventDate);
    eventEnd.setDate(eventEnd.getDate() + 1);

    let start = formatDate(event.eventDate, 'yyyyMMdd');
    let end = formatDate(event.eventDate, 'yyyyMMdd');

    const update = `${formatDate(event.updatedAt, 'yyyyMMdd')}T${formatDate(event.updatedAt, 'HHmmss')}`;

    if (event.eventEnd) {
        start = `${formatDate(event.eventDate, 'yyyyMMdd')}T${formatDate(event.eventStart, 'HHmmss')}`;
        end = `${formatDate(event.eventDate, 'yyyyMMdd')}T${formatDate(event.eventEnd, 'HHmmss')}`;
    }

    ics = ics.concat(`DTSTART;TZID=Europe/Berlin:${start}\r\n`);
    ics = ics.concat(`DTEND;TZID=Europe/Berlin:${end}\r\n`);
    ics = ics.concat(`DTSTAMP;TZID=Europe/Berlin:${update}\r\n`);

    ics = ics.concat(`SUMMARY:${event.title}\r\n`);
    ics = ics.concat(`LOCATION:${event.eventLocation}\r\n`);

    ics = ics.concat(`URL:https://b-side.ovh/events/${event.id}\r\n`);
    ics = ics.concat(`DESCRIPTION:https://b-side.ovh/events/${event.id}\r\n`);
    ics = ics.concat(`UID:${update}-${start}-${end}\r\n`);

    ics = ics.concat('END:VEVENT\r\n');
    ics = ics.concat('END:VCALENDAR');

    return ics;
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { eventId } = req.query;

    try {
        if (isEmptyString(eventId as string)) {
            throw new Error('Event not found.');
        }

        const pagesResponse = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/?limit=100');

        const page = pagesResponse.docs.find(event => {
            return event.id === `${eventId}`;
        });

        if (page === undefined) {
            throw new Error('Event not found.');
        }

        res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
        res.status(200).send(createIcsFile(page));
    } catch (error) {
        res
            .status(500)
            .send(
                process.env.NODE_ENV !== 'production'
                    ? JSON.stringify(error)
                    : ''
            );
    }
};

