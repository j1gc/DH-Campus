<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { MoveUpRight } from 'lucide-svelte';
</script>

<div class="justify-between pb-16 lg:flex">
	<p class="max-w-[19ch] text-2xl font-bold max-lg:mb-9 sm:text-5xl lg:text-7xl">
		Arbeiten im Einklang mit Natur und Kultur
	</p>
	<div class="max-w-[45ch] leading-relaxed">
		<p>
			Willkommen bei der DH Campus. Ihrem Cowrokingspaceanbieter im Landkreis Diepholz! Hier gibt es
			moderne Arbeitsplätze, die inerhalb unserer Kreisstadt zum produkitven Arbeitem einladen.
		</p>
		<p class="pt-6 max-lg:hidden">
			Unsere Standorte bewähren sich nicht nur wegen ihren produktiven umfeld sondern auche wegen
			ihrer kulturellen Vielfalt im Landkreis Diepholz. Wir bieten ihnen dabei neben ein produktiven
			Arbeitsumfeld auch ausreichend Raum zum Abschalten und Entspannen im Freien. Neben diesen
			arbeiten sie in ein umfeld welches Innovation sowie Nachhaltigkeit fördert.Treten Sie unser
			Community bei und wir werden gemeinsam umweltbewusst und zukunftsorientiert arbeiten.
		</p>
	</div>
</div>

<!--Bild mit enhanced:img eingefügt um bessere Kompremierung sowie auf das Anfragegerät ein zugeschnittens Bild sowie Format zurückzugeben-->
<!--Anpassung des aspect ratios sowie saturation unter src Attribut-->
<enhanced:img
	src="/static/images/moor1.jpg?aspect=16:7&saturation=1.2"
	alt="Symbolbild: Moor"
	class="w-full"
/>

<div class="pt-9">
	<div class="mb-20 border-b-[1.5px] border-DHGray pb-9 text-DHGray">01</div>
	<div class="mr-20 justify-between lg:flex">
		<div class="text-2xl font-bold max-lg:pb-4 sm:text-4xl lg:text-7xl">Unsere Lösungen</div>
		<div class="grid gap-y-3 sm:grid-cols-2 lg:gap-14 lg:gap-x-32">
			<!--Rendern von den lösungen die wir anbieten-->
			{@render solutions(
				'Seminarangebote',
				'Bei DH-Campus gibt es viele flexible Seminarangebote für verschiedene inspirierende Anlässe wie persönliche Projekte, öffentliche Wirtschaft, und gemeinsame Kreativität, die Eure Erwartungen und Fähigkeiten hoffentlich erfüllen.'
			)}
			{@render solutions(
				'Kongressplanung',
				'Auch ihren nächsten Kongress können Sie mithilfe von uns durch Unterstützung von euren Präsentationen und Veranstaltungen in einer tollen und inspirierenden Umgebung planen, ohne dass es zu ungemütlich oder ausdruckslos wird.'
			)}
			{@render solutions(
				'Mieträumlichkeiten',
				'Unsere Mieträume bieten Vorteile an, indem sie für Meetings und Veranstaltungen geeignet sind und auch nachhaltig und modern ausgestattet sind, sodass sie eine vielfältige und angenehme Atmosphäre ausstrahlen.'
			)}
			{@render solutions(
				'Coworking Spaces',
				'Wenn Sie flexibel und einfach arbeiten wollen und dazu noch vorhaben, Arbeitsleben und Freizeit ausgleichen, dann sind unsere vielfältigen Coworking Spaces mit ihrer Eigenschaft, Verbindungen zwischen Unternehmern aufzubauen, etwas für Euch.'
			)}
			{@render solutions(
				'Mitgliedschaften',
				'Wir bieten Ihnen flexible Mitgliedschaften an, die sich ideal für Meetings, Workshops und Veranstaltungen eignen. Unsere modernen und nachhaltigen Spaces sind bestens ausgestattet und bieten ein inspirierendes Umfeld, das Natur und Kultur widerspiegelt.'
			)}
			{@render solutions(
				'Festräume',
				'Nicht nur Arbeit und Fortbildung findet seinen Platz im DH-Campus. Mithilfe von Festraumangeboten können Sie organisieren, wo Sie Eure nächste Veranstaltung oder Festlichkeit haben wollt, damit es für Eure Mitmenschen unvergesslich bleibt.'
			)}

			<p class="pt-6"></p>
		</div>
	</div>
</div>

<!--Html für solution snippet-->
{#snippet solutions(title = 'title', text = 'text', href = '/solutions#fjksj')}
	<div class="w-[33ch] xl:w-[44ch]">
		<h3 class="pb-1 font-semibold">{title}</h3>
		<p class="line-clamp-5 lg:h-36 xl:leading-relaxed">{text}</p>
		<Button {href} variant="link" class="mt-2  pl-0 text-DHGray"
			>Mehr erfahren <MoveUpRight /></Button
		>
	</div>
{/snippet}
