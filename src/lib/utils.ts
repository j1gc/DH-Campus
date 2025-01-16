import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// fake data in a real app, this would be fetched from an API or a database
// TODO: Put in database
/*	{
	name: 'Schuster Platz',
	address: 'Schuster Platz 1, 49356 Diepholz',
	capacity: 20,
	imgaddr: '/images/findlocation/PXL_20241213_140001630.webp',
	price: '10€',
	benefits: ['Kostenloses WLAN', 'Kostenlose Parkplätze', 'Kostenlose Getränke'],
	sizeDescription: 'Mittelgroßer Raum, ideal für kleinere Teams.',
	additionalInfo:
		'Dieser helle und freundliche Raum ist ideal für kleinere Teams. Er bietet eine gute Belüftung und ist mit bequemen Stühlen ausgestattet. Die großen Fenster sorgen für viel natürliches Licht, was eine angenehme Arbeitsatmosphäre schafft. Ein großer Tisch bietet ausreichend Platz für alle Teilnehmer.',
	size: '60 m²',
	passes: [
		{ type: 'Tagespass', price: 10, description: 'Ganztägige Nutzung des Raumes.' },
		{ type: 'Halbtagespass', price: 6, description: 'Nutzung für 4 Stunden.' },
		{
			type: 'Seminarpass',
			price: 80,
			description: 'Nutzung für ein Seminar inklusive Vorbereitung.'
		}
	],
	rating: 4.2,
	numberOfReviews: 35
},*/
export const buildings = [
	{
		name: 'Grafenplatz',
		address: 'Grafenplatz 1, 49356 Diepholz',
		capacity: 21,
		imgaddr: '/images/findlocation/PXL_20241213_140153336.webp',
		price: '13€',
		benefits: [
			'Kostenloses WLAN',
			'Kostenlose Parkplätze',
			'Kostenlose Getränke',
			'Kostenloses Essen'
		],
		sizeDescription: 'Geräumiger Konferenzraum mit viel Platz.',
		additionalInfo:
			'Der Grafenplatz ist ein geräumiger Konferenzraum, der mit modernster Technik ausgestattet ist. Er bietet Platz für bis zu 21 Personen und verfügt über eine hochwertige Audio- und Videoausrüstung. Die bequemen Stühle und der große Konferenztisch sorgen für eine produktive Arbeitsatmosphäre. Zudem ist der Raum klimatisiert.',
		size: '85 m²',
		passes: [
			{
				type: 'Tagespass',
				price: 13,
				description: 'Ganztägige Nutzung des Konferenzraumes, inklusive Verpflegung.'
			},
			{ type: 'Stundenpass', price: 4, description: 'Nutzung pro Stunde.' },
			{
				type: 'Workshop-Pass',
				price: 120,
				description: 'Nutzung für einen Workshop mit bis zu 20 Personen.'
			}
		],
		rating: 4.7,
		numberOfReviews: 78
	},
	{
		name: 'Königsplatz',
		address: 'Königsplatz 1, 49356 Diepholz',
		capacity: 16,
		imgaddr: '/images/findlocation/PXL_20241213_140206383.webp',
		price: '15€',
		benefits: ['Kostenloses WLAN', 'Kostenlose Parkplätze', 'Kostenlose Getränke'],
		sizeDescription: 'Angenehme Größe für mittlere Gruppen.',
		additionalInfo:
			'Der Königsplatz bietet eine ruhige und angenehme Atmosphäre, ideal für konzentriertes Arbeiten. Der Raum ist mit ergonomischen Stühlen und einem großen Tisch ausgestattet. Die indirekte Beleuchtung schafft eine entspannende Umgebung. Hier können Sie ungestört arbeiten und Ideen entwickeln. Es gibt zudem eine Whiteboard für Präsentationen.',
		size: '55 m²',
		passes: [
			{ type: 'Tagespass', price: 15, description: 'Nutzung des Raumes für den ganzen Tag.' },
			{
				type: 'Monatspass',
				price: 200,
				description: 'Unbegrenzte Nutzung des Raumes für einen Monat.'
			},
			{ type: 'Mehrtagespass', price: 50, description: 'Nutzung des Raumes für 3 Tage.' }
		],
		rating: 4.5,
		numberOfReviews: 52
	},
	{
		name: 'Kaiserplatz',
		address: 'Kaiserplatz 1, 49356 Diepholz',
		capacity: 7,
		imgaddr: '/images/findlocation/PXL_20241213_140445588.webp',
		price: '20€',
		benefits: ['Kostenloses WLAN', 'Kostenlose Parkplätze', 'Kostenlose Getränke'],
		sizeDescription: 'Kleiner, aber feiner Raum für kleine Besprechungen.',
		additionalInfo:
			'Der Kaiserplatz ist ein kleiner, aber sehr gemütlicher Raum. Er ist mit viel Tageslicht durchflutet und bietet eine angenehme Atmosphäre für kleine Besprechungen und Meetings. Die Einrichtung ist stilvoll und einladend, mit bequemen Sesseln und einem kleinen Tisch. Es ist der ideale Ort für vertrauliche Gespräche und konzentrierte Arbeit.',
		size: '30 m²',
		passes: [
			{ type: 'Stundenpass', price: 6, description: 'Nutzung des Raumes pro Stunde.' },
			{
				type: 'Projektpass',
				price: 50,
				description: 'Nutzung des Raumes für ein spezifisches Projekt, max 3 Tage.'
			},
			{ type: 'Seminarpass', price: 90, description: 'Nutzung für ein halbtägiges Seminar.' }
		],
		rating: 4.1,
		numberOfReviews: 18
	},
	{
		name: 'Kurfürstenplatz',
		address: 'Kurfürstenplatz 1, 49356 Diepholz',
		capacity: 5,
		imgaddr: '/images/findlocation/PXL_20241213_140538373.webp',
		price: '25€',
		benefits: ['Kostenloses WLAN', 'Kostenlose Parkplätze', 'Kostenlose Getränke'],
		sizeDescription: 'Kompakter Raum für intensive Sitzungen.',
		additionalInfo:
			'Der Kurfürstenplatz ist ein kompakter Raum, der sich ideal für intensive Sitzungen und Brainstorming-Sessions eignet. Der Raum ist schlicht gehalten, um Ablenkungen zu minimieren. Er ist mit einem Tisch und bequemen Stühlen ausgestattet. Hier können Sie ungestört mit einem kleinen Team zusammenarbeiten und innovative Ideen entwickeln. Es gibt zudem ein Flipchart.',
		size: '25 m²',
		passes: [
			{
				type: 'Stundenpass',
				price: 7,
				description: 'Nutzung pro Stunde, ideal für kleine Besprechungen.'
			},
			{ type: 'Wochenpass', price: 120, description: 'Unbegrenzte Nutzung für eine Woche.' },
			{
				type: 'Workshop-Pass',
				price: 150,
				description: 'Nutzung für einen Workshop mit bis zu 5 Personen.'
			}
		],
		rating: 4.9,
		numberOfReviews: 112
	},
	{
		name: 'Herzogplatz',
		address: 'Herzogplatz 1, 49356 Diepholz',
		capacity: 3,
		imgaddr: '/images/findlocation/PXL_20241213_140830870.webp',
		price: '30€',
		benefits: ['Kostenloses WLAN', 'Kostenlose Parkplätze', 'Kostenlose Getränke'],
		sizeDescription: 'Sehr kleiner Raum für Einzelpersonen oder kleine Gruppen.',
		additionalInfo:
			'Der Herzogplatz ist ein sehr kleiner, intimer Raum, ideal für Einzelgespräche und Einzelcoaching. Die Atmosphäre ist ruhig und diskret. Der Raum ist mit einem bequemen Sessel und einem kleinen Tisch ausgestattet. Hier können Sie ungestört Einzelgespräche führen und sich auf wichtige Einzeltermine konzentrieren.',
		size: '15 m²',
		passes: [
			{
				type: 'Stundenpass',
				price: 10,
				description: 'Nutzung des Raumes pro Stunde, ideal für Einzelcoaching.'
			},
			{ type: 'Seminarpass', price: 100, description: 'Nutzung für einen Einzel-Seminar.' }
		],
		rating: 3.8,
		numberOfReviews: 10
	}
];
