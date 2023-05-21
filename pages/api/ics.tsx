import formatDate from '../../lib/common/helper/formatDate';
import isEmptyString from '../../lib/common/helper/isEmptyString';
import getPayloadResponse from '../../lib/payload/getPayloadResponse';
import type PaginatedDocs from '../../types/payload/PaginatedDocs';
import type { Event } from '../../types/payload/payload-types';

const createIcsFile = (event: Event): string => {

    let ics =
        // Calendar
        'BEGIN:VCALENDAR\n' +
        'VERSION:2.0\n' +
        'CALSCALE:GREGORIAN\n' +

        // Time Zone Information
        'BEGIN:VTIMEZONE\n' +
        'TZID:Europe/Berlin\n' +
        'TZURL:http://tzurl.org/zoneinfo-outlook/Europe/Berlin\n' +
        'X-LIC-LOCATION:Europe/Berlin\n' +
        'BEGIN:DAYLIGHT\n' +
        'TZOFFSETFROM:+0100\n' +
        'TZOFFSETTO:+0200\n' +
        'TZNAME:CEST\n' +
        'DTSTART:19700329T020000\n' +
        'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\n' +
        'END:DAYLIGHT\n' +
        'BEGIN:STANDARD\n' +
        'TZOFFSETFROM:+0200\n' +
        'TZOFFSETTO:+0100\n' +
        'TZNAME:CET\n' +
        'DTSTART:19701025T030000\n' +
        'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\n' +
        'END:STANDARD\n' +
        'END:VTIMEZONE\n' +

        // Event
        'BEGIN:VEVENT\n';

    const eventEnd = new Date(event.eventDate);
    eventEnd.setDate(eventEnd.getDate() + 1);

    let start = formatDate(event.eventDate, 'yyyyMMdd');
    let end = formatDate(eventEnd, 'yyyyMMdd');

    const update = `${formatDate(event.updatedAt, 'yyyyMMdd')}T${formatDate(event.updatedAt, 'HHmmss')}`;

    if (event.eventEnd) {
        start = `${formatDate(event.eventDate, 'yyyyMMdd')}T${formatDate(event.eventStart, 'HHmmss')}`;
        end = `${formatDate(event.eventDate, 'yyyyMMdd')}T${formatDate(event.eventEnd, 'HHmmss')}`;
    }

    ics = ics.concat(`DTSTART;TZID=Europe/Berlin:${start}\n`);
    ics = ics.concat(`DTEND;TZID=Europe/Berlin:${end}\n`);
    ics = ics.concat(`DTSTAMP;TZID=Europe/Berlin:${update}\n`);

    ics = ics.concat(`SUMMARY:${event.title}\n`);
    ics = ics.concat(`LOCATION:${event.eventLocation}\n`);

    ics = ics.concat(`URL:https://b-side.ovh/events/${event.id}\n`);
    ics = ics.concat(`DESCRIPTION:https://b-side.ovh/events/${event.id}\n`);
    ics = ics.concat(`UID:${update}-${start}-${end}\n`);

    ics = ics.concat('END:VEVENT\n');
    ics = ics.concat('END:VCALENDAR\n');

    return ics;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req, res) => {
    const { eventId } = req.query;

    try {
        if (isEmptyString(eventId)) {
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

