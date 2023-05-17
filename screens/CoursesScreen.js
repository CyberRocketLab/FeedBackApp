import React, {useState, useRef, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableHighlight, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

function CoursesScreen({route, navigation}) {
    //Receiving Faculty from FacultiesScreen
    const {faculty} = route.params;

    // Creating Faculties
    // Not making .map because somehow it was leading to errors
    const faculties = {
        'Informatik': {
            '1': ['Informatik + Recht (RGG)', 'Theoretische Informatik (THI)', 'Technische Grundlagen der Informatik (TGI)', 'Mathematische Grundlagen der Informatik (MG1)', 'Programmierung 1 (PR1)'],
            '2': ['Modellierung (MOD)', 'Informatik + Gesellschaft (RGG)', 'Algorithmen und Datenstrukturen (ADS)', 'Betriebssysteme (OS)', 'Mathematische Grundlagen der Informatik 2 (MG2)', 'Programmierung 2 (PR2)'],
            '3': ['Projekt-manage-ment (HCI)', 'Grundl. d. intellig. Systeme (IDS)', 'Datenbanksysteme (DBS)', 'Einführung in Numerical Computing (NUM)', 'Einführende Statistik (EST)', 'Programmiersprachen und -konzepte (PLC)'],

            '4': ['Mensch-Computer-Interaktion (HCI)', 'Vertiefung 1', 'Vertiefung 2', 'Einführung in die mathematische Modellierung (MM)', 'Software Engineering 1 (SE1)'],
            '5': ['Netzwerktechnologien (NET)', 'Vertiefung 3', 'Vertiefung 4', 'Vertiefung 5', 'Software Engineering 2 (SE2)'],
            '6': ['Informations-sicherheit (IS)', 'Erweiterung', 'Softwarepraktikum mit Bachelorarbeit']
        },
        'Chemie': {
            '1': ['Chemie Course 1', 'Chemie Course 2'],
            '2': ['Chemie Course 3', 'Chemie Course 4'],
        },
        'Mathematik': {
            '1': ['Math Course 1', 'Math Course 2'],
            '2': ['Math Course 3', 'Math Course 4'],
        },
    };

    // Creating description for faculties
    const courseDescriptions = {
        'Informatik + Recht (RGG)': 'Diese Veranstaltung richtet sich an Informatikstudierende ' +
            'und bietet einen Überblick über für diese relevante Rechtsfragen. ' +
            'Eingebunden werden Mitarbeiterinnen und Mitarbeiter des Instituts für Innovation ' +
            'und Digitalisierung im Recht. Einzelne Stunden werden daher auf Englisch gelehrt.',
        'Theoretische Informatik (THI)': 'Einführung in die Methoden und Anwendungsgebiete von ausgewählten Teilen ' +
            'der Theoretischen Informatik.\n' +
            'Ziele: Die Studierenden kennen die Grundlagen formaler Logik, die verschiedenen ' +
            'Arten von formalen Grammatiken und Automaten, die Zusammenhänge zwischen Grammatiken' +
            ' und Automaten (Chomsky-Hierarchie), und die Grundlagen der Berechenbarkeits- und Komplexitätstheorie. ' +
            'Ferner können sie Logik als Spezifikationssprache anwenden, und formale Sprachen mittels formaler Grammatiken und Automaten beschreiben.',
        'Technische Grundlagen der Informatik (TGI)': 'Ziel des Moduls TGI ist das Kennenlernen und Verstehen der ' +
            'Architektur und der allgemeinen Funktionsweise von Computersystemen. ' +
            'Inhalte sind insbesondere technische Grundlagen wie Zahlendarstellung und Boolesche Algebra, ' +
            'Digitale Logik und Rechnerarchitekturen; daneben wird auch auf die historische Entwicklung der ' +
            'Informatik eingegangen. Ein Ausblick auf aktuelle Entwicklungen im Bereich Quantencomputing beschließt die Vorlesung.',
        'Mathematische Grundlagen der Informatik (MG1)': 'Die Studierenden kennen und verstehen elementare Grundbegriffe und Grundkonzepte der ' +
            '                                              mathematischen Grundlagen der Informatik aus den Bereichen Mengenlehre, Arithmetik und Algebra, lineare Algebra und analytische Geometrie, diskrete Mathematik, Graphentheorie.',
        'Programmierung 1 (PR1)': 'Für die Lehrveranstaltung werden keinerlei Programmierkenntnisse vorausgesetzt. Folgende Kenntnisse sind im Lauf des Semesters zu erwerben:\n' +
            'Grundkenntnisse über Algorithmen und Programmierung digitaler Rechner\n' +
            'Daten, Algorithmen, Programmiersprachen, Programme - eine begriffliche Einführung\n' +
            'Grundlagen der imperativen Programmierung\n' +
            'Grundlagen der objektorientierten Programmierung',


        'Modellierung (MOD)': 'Dieser Modul vermittelt die für Informatiker/-innen notwendigen Grundlagen der Methoden der Modellierung statischer und dynamischer Aspekte.\n' +
            'Im Rahmen der Lehrveranstaltung werden folgende Inhalte vermittelt:\n' +
            '- Ziele und Modus der Lehrveranstaltung\n' +
            'TEIL 1:\n' +
            '- Was ist Modellierung, Modellbegriff, Übersicht und Einführung in die Themen\n' +
            '- Daten-, Objekt-, Prozessorientierte Modellierung, Ontologien, Semantische Datenmodelle\n' +
            '- ER-Modell\n' +
            '- UML - u.a. Anwendungsfall-, Klassen-, Aktivitäts-, Zustands-, Sequenz-, Paket-, Komponenten-, und Verteilungsdiagramme\n' +
            'TEIL 2:\n' +
            '- Von Diagrammen zu Modellen\n' +
            '- Modellierung: Vorgehen und Techniken\n' +
            '- BPMN\n' +
            '- DMN\n' +
            '- EPK\n' +
            '- Petri Netze\n' +
            '- Wert von Modellen/Simulation/Transformation z.B. RDF, SQL',
        'Informatik + Gesellschaft (RGG)': 'Die Lehrveranstaltung „Informatik und Gesellschaft“ soll die Studierenden dazu anregen, sich mit ' +
            'aktuellen und zukünftigen gesellschaftspolitischen Themen auseinanderzusetzen und deren Einflussfaktoren auf die ' +
            'Informatik einschätzen bzw. beurteilen zu können. Umgekehrt sollen die Einflüsse der Informatik auf die Gesellschaft ' +
            'bewusst wahrgenommen und nachvollzogen werden. Die Teilnehmer*innen sollen die Fähigkeit entwickeln, ' +
            'Situationen nach ethischen, politischen, sozialen, ökonomischen und Sicherheitsfaktoren zu analysieren und dementsprechend ' +
            'zu handeln. Hierzu lernen sie gesellschaftliche Voraussetzungen sowie potentielle Folgen der Informatik/IKT kennen, ' +
            'und können sie vor dem Hintergrund sozial- und geisteswissenschaflicher Theorien erklären.',
        'Algorithmen und Datenstrukturen (ADS)': 'Die Studierenden erlangen Kenntnisse über Aufwandsabschätzungen, Komplexitätsmaße, grundlegende Datenstrukturen, ' +
            'Such- und Sortierverfahren und grundlegende Graph- und Optimierungsalgorithmen. Sie werden dadurch befähigt Algorithmen und geeignete Datenstrukturen ' +
            'für gegebene Problemstellungen zu entwerfen oder auszuwählen und das Leistungsverhalten zu beurteilen.',
        'Betriebssysteme (OS)': 'Ziel ist, die wichtigsten Konzepte und Ideen moderner Betriebssysteme zu verstehen und anwenden zu können.\n' +
            'Anhand des Buchs wird erklärt, warum Betriebssysteme notwendig sind, um Computer verwenden zu können und welche Dienste sie Anwendungssoftware zur Verfügung stellen. Außerdem verstehen Studierende, ' +
            'welche Sicherheitsrisiken von Betriebssystemen adressiert werden müssen, weil viele Prozesse und verschiedene User gleichzeitig ein System mit geteilten Ressourcen verwenden.',
        'Mathematische Grundlagen der Informatik 2 (MG2)': 'Die Studierenden kennen die Grundlagen der ein- und mehrdimensionalen Analysis und können diese Kenntnisse selbständig auf einfache Fragestellungen in Wirtschaft, Technik und ' +
            'Naturwissenschaften anwenden. Sie sind in der Lage, geeignete Softwarewerkzeuge zur Modellierung, grafischen Darstellung und Lösung der Fragestellungen effizient einzusetzen. Studierende können dieses Wissen im ' +
            'Rahmen einer mündlichen Präsentation vermitteln.',
        'Programmierung 2 (PR2)': 'Für die Lehrveranstaltung werden die Kenntnisse aus Programmierung 1 (PR1) als bekannt vorausgesetzt. Diese werden vertieft und erweitert. Schwerpunkte in C++ sind:\n' +
            'Vererbung, Templates, Exception Safety, STL und Move Semantik.\n' +
            'Außerdem wird eine zweite Programmiersprache (Java) eingeführt und die Gemeinsamkeiten und Unterschiede der beiden Sprachen werden erarbeitet.',
        'Projekt-manage-ment (HCI)': 'Nach erfolgreicher Absolvierung der VU besitzen AbsolventInnen folgende fachliche Kompetenzen:\n' +
            '* Sie kennen die Basiskonzepte des klassischen und agilen Managements von Informatik-Projekten und können je nach Charakteristika einer gegebenen Situation passende Methoden auswählen und anpassen.\n' +
            '* Sie können einen Projektantrag und Projektauftrag (inkl. Projektplänen, Umwelt- und Risikoanalyse) für ein kleines Projekt im Team erstellen und die erarbeitete Projekt-Ergebnisse verständlich präsentieren.\n' +
            '* Sie kennen die Unterschiede zwischen klassischen und agilen Methoden.',
        'Grundl. d. intellig. Systeme (IDS)': '',
        'Datenbanksysteme (DBS)': 'AbsolventInnen der Lehrveranstaltung verstehen die grundlegenden Funktionsweisen von Datenbanksystemen, ' +
            'können Datenbanken entwerfen und abfragen, können Datenbanksysteme für die Erstellung von Anwendungssystemen ' +
            'einsetzen und in Programme einbinden, kennen die theoretischen Grundlagen der relationalen Datenbanken, verstehen die Probleme des ' +
            'Mehrbenutzerbetriebs und die grundsätzlichen Lösungsmöglichkeiten. Anhand von praktischen Aufgabenstellungen vertiefen die Studierenden ' +
            'die notwendigen Kenntnisse und Fähigkeiten Datenbanksysteme für die Erstellung von Anwendungssystemen einzusetzen.',
        'Einführung in Numerical Computing (NUM)': 'Die Lehrveranstaltung wird primär physisch in den gelisteten Hörsälen abgehalten. Sie besteht aus einem Vorlesungsteil und einem Übungsteil. ' +
            'Der Vorlesungsteil wird für alle Gruppen gemeinsam in einem Hörsaal abgehalten und der Übungsteil wird für jede Gruppe separat abgehalten.',
        'Einführende Statistik (EST)': 'Die Studierenden verfügen über Fähigkeiten empirische Sachverhalte mittels statistischer Basistechniken zu beschreiben und graphisch korrekt zu repräsentieren; ' +
            'sowie über ein prinzipielles Verständnis für die grundlegenden Konzepte der Wahrscheinlichkeitstheorie und der ' +
            'inferenzstatistischen Modellierung und Methodik.',
        'Programmiersprachen und -konzepte (PLC)': 'Students understand and are able to assess the main concepts of different programming paradigms and languages, including object-oriented programming, ' +
            'functional programming, logic programming and aspect-oriented programming. They can make informed decision on the use and applicability of different ' +
            'languages and concepts for application development. Students learn the main methods and tools for compiler construction, ' +
            'static program analysis and optimization, and runtime support. Students apply these concepts and methods in practical programming and development projects.',
        'Mensch-Computer-Interaktion (HCI)': 'Mensch-Computer Interaktion, Human-centered design, usability engineering, barrierefreies Design, Grundlagen der kognitiven Psychologie, ' +
            'Motivation und der Kommunikationspsychologie, App Programmierung.',
        'Vertiefung 1': '',
        'Vertiefung 2': '',
        'Einführung in die mathematische Modellierung (MM)': 'Vermittlung grundlegender Methoden und Algorithmen zu verschiedenen Teilbereichen der Modellierung und Optimierung (beispielsweise Differentialgleichungen,' +
            ' Lineare und Nichtlineare Optimierungsverfahren, Metaheuristiken, Zufallszahlen, ' +
            'Markov-Ketten). Gute Kenntnisse der ein- und mehrdimensionalen Differential- ' +
            'und Integralrechnung (im Rahmen des Stoffes der Module MGI1 und MGI2) werden vorausgesetzt.',
        'Software Engineering 1 (SE1)': 'Lernziele:\n' +
            '‣ Überblick über grundlegende und weiterführende Konzepte (z.B. Anforderungsanalyse, sichere Softwareentwicklung, Softwarearchitekturen, etc.)\n' +
            '‣ Überblick über Herausforderungen und Lösungsmöglichkeiten in der Softwareentwicklung (z.B. Logging, Netzwerkkommunikation, Testing, etc.)\n' +
            '‣ Ausgewählte Themen können selbstständig theoretisch und/oder praktisch bearbeitet werden.',

        'Netzwerktechnologien (NET)': 'Die Vorlesung bringt Ihnen Computer- und Kommunikationsnetze näher, mit besonderem Schwerpunkt auf dem Internet und den damit zusammenhängenden Technologien. ' +
            'Wir betrachten sowohl theoretische Grundlagen als auch praktische Anwendungen aller ' +
            'Ebenen des Schichtmodells. Der Vortrag orientiert sich an der angegebenen Literatur und ' +
            'greift als Diskussionsthemen auch aktuelle gesellschaftliche und politische Entwicklungen aus Netzsicht auf.',
        'Vertiefung 3': '',
        'Vertiefung 4': '',
        'Vertiefung 5': '',
        'Software Engineering 2 (SE2)': 'Aims:\n' +
            'The aims of the course are (1) to gain a deep understanding of basic principles for the systematic construction, design, and further development of high quality software systems,\n' +
            'and (2) to train practical proficiency in the application of these principles in modern development environments.',
        'Informa-tions-sicherheit (IS)': 'Ziel der Lehrveranstaltung ist es, die Grundlagen von Informationssicherheit zu vermitteln. Der Vorlesungsteil basiert auf einem Lehrbuch. Im Übungsteil werden aktuelle Themen in Form von Lab Assignments zuhause selbständig bearbeitet.\n' +
            'Inhalte:\n' +
            '- Introduction\n' +
            '- Authentication, Access Control,\n' +
            '- Intro to Cryptography\n' +
            '- Secure Software Development\n' +
            '- Operating Systems Security\n' +
            '- Network Security\n' +
            '- Database Security\n' +
            '- Privacy',
        'Erweiterung': '',
        'Softwarepraktikum mit Bachelorarbeit': ''
    };

    // Get the semesters for the selected faculty
    const semesters = faculties[faculty];

    // Hook for searching the Input
    const [searchTerm, setSearchTerm] = useState('');
    // Hook for determination if searchBar is visible
    const [searchVisible, setSearchVisible] = useState(false);

    const inputRef = useRef(null);

    // Filtering the Output of search Result
    const filteredCourses = Object.values(semesters).flatMap(courses => courses.filter(course =>
        course.toLowerCase().includes(searchTerm.toLowerCase())
    ));

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
        setSearchTerm('');
        if (!searchVisible) {
            setTimeout(() => inputRef.current.focus(), 100);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Icon
                    name={searchVisible ? 'close-outline' : 'search-outline'}
                    size={30}
                    color="black"
                    style={{marginRight: 16}}
                    onPress={toggleSearch}
                />
            ),
        });
    }, [navigation, searchVisible]);

    return (
        <ScrollView style={styles.container}>
            {searchVisible && (
                <TextInput
                    style={styles.input}
                    onChangeText={text => setSearchTerm(text)}
                    value={searchTerm}
                    placeholder="Search Courses"
                    ref={inputRef}
                />
            )}
            {Object.keys(semesters).map(semester => (
                <View key={semester} style={styles.semesterContainer}>
                    <Text style={styles.semesterTitle}>Semester {semester}</Text>
                    {semesters[semester].filter(course =>
                        course.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map(course => (
                        <TouchableHighlight
                            key={course}
                            style={styles.courseCard}

                            underlayColor="#e0dcdc" // Set the background color when the card is pressed
                            onPress={() => navigation.navigate('Course', {
                                course,
                                description: courseDescriptions[course]
                            })}

                        >
                            <Text style={styles.courseTitle}>{course}</Text>
                        </TouchableHighlight>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    input: {
        height: 40,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        paddingLeft: 10,
        margin: 16,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        fontSize: 16,
    },
    semesterContainer: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 8,
        marginHorizontal: 8,
        //    borderRadius: 5,
        //    borderColor: '#E0E0E0',
        //    borderWidth: 1,
        //    shadowColor: '#000',
        //    shadowOffset: {
        //      width: 0,
        //      height: 1,
        //    },
        //    shadowOpacity: 0.2,
        //    shadowRadius: 2,
        //    elevation: 3,
    },
    semesterTitle: {
        fontSize: 24,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    courseCard: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
    }});

export default CoursesScreen;
