// Placeholder Talk Data
const talks = [
    {
        title: "Introduction to WebAssembly",
        speakers: ["Alice Smith"],
        categories: ["Web Development", "Performance"],
        duration: 60, // minutes
        description: "Explore the basics of WebAssembly and its potential to revolutionize web performance and new application use cases.",
    },
    {
        title: "Advanced React Hooks Patterns",
        speakers: ["Bob Johnson", "Carol White"],
        categories: ["Frontend", "React", "JavaScript"],
        duration: 60,
        description: "Dive deep into custom React hooks, performance optimization with `useMemo` and `useCallback`, and state management patterns.",
    },
    {
        title: "Machine Learning with TensorFlow.js",
        speakers: ["David Green"],
        categories: ["Machine Learning", "JavaScript", "AI"],
        duration: 60,
        description: "Learn how to build and deploy machine learning models directly in the browser using TensorFlow.js.",
    },
    {
        title: "Containerizing Applications with Docker and Kubernetes",
        speakers: ["Eve Black"],
        categories: ["DevOps", "Cloud", "Containers"],
        duration: 60,
        description: "A practical guide to packaging your applications with Docker and orchestrating them with Kubernetes for scalable deployments.",
    },
    {
        title: "API Design Best Practices with Node.js",
        speakers: ["Frank Brown", "Grace Lee"],
        categories: ["Backend", "Node.js", "API"],
        duration: 60,
        description: "Understand the principles of RESTful API design, error handling, and authentication best practices using Node.js and Express.",
    },
    {
        title: "Understanding Blockchain Fundamentals",
        speakers: ["Hannah Davis"],
        categories: ["Blockchain", "Security", "FinTech"],
        duration: 60,
        description: "An accessible introduction to blockchain technology, cryptocurrencies, and decentralized applications.",
    },
];

const eventStartTime = "10:00 AM";
const talkDuration = 60; // minutes
const transitionDuration = 10; // minutes
const lunchDuration = 60; // minutes (1 hour)

function parseTime(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }
    return new Date(2000, 0, 1, hours, minutes); // Use a fixed date for calculation
}

function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
}

function generateSchedule(talks, startTimeStr) {
    let currentTime = parseTime(startTimeStr);
    const scheduledTalks = [];
    const talksPerDay = 6;
    let talkIndex = 0;

    for (let i = 0; i < talksPerDay; i++) {
        // Add talk
        const talk = { ...talks[talkIndex] };
        talk.startTime = formatTime(currentTime);
        currentTime.setMinutes(currentTime.getMinutes() + talk.duration);
        talk.endTime = formatTime(currentTime);
        scheduledTalks.push(talk);
        talkIndex++;

        // Add transition or lunch
        if (i < talksPerDay - 1) {
            currentTime.setMinutes(currentTime.getMinutes() + transitionDuration);
            // Assuming lunch after the second talk
            if (i === 1) { // After Talk 2, before Talk 3
                const lunchBreak = {
                    title: "Lunch Break",
                    speakers: [],
                    categories: [],
                    duration: lunchDuration,
                    description: "Enjoy a delicious lunch!",
                    isBreak: true
                };
                lunchBreak.startTime = formatTime(currentTime);
                currentTime.setMinutes(currentTime.getMinutes() + lunchDuration);
                lunchBreak.endTime = formatTime(currentTime);
                scheduledTalks.push(lunchBreak);
                currentTime.setMinutes(currentTime.getMinutes() + transitionDuration); // Transition after lunch too
            }
        }
    }

    return scheduledTalks;
}

const scheduledTalks = generateSchedule(talks, eventStartTime);

module.exports = scheduledTalks;