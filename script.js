// МОБИЛЬНОЕ МЕНЮ

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", function () {
    nav.classList.toggle("active");
});

// ЗАКРЫТИЕ МЕНЮ ПОСЛЕ ПЕРЕХОДА

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        nav.classList.remove("active");
    });
});
// MATCH MISIS — ЛОГИКА СВАЙП-ЛЕНТЫ

(() => {

    const profiles = [

        {
            id: 1,
            name: "Александра",
            surname: "Соколова",
            age: 18,
            gender: "female",
            likesYou: true,
            direction: "Бизнес-информатика · 1 курс",
            dorm: "Металлург-1",
            routine: "🌙 Сова",
            about: "Люблю порядок, спокойные вечера, прогулки и иногда посидеть с друзьями. Ищу комфортного соседа.",
            interests: ["Порядок", "Музыка", "Прогулки"],
            color: "#b69cde"
        },

        {
            id: 2,
            name: "Елизавета",
            surname: "Морозова",
            age: 18,
            gender: "female",
            direction: "Экономика · 1 курс",
            dorm: "Металлург-1",
            routine: "☀️ Жаворонок",
            about: "Люблю смотреть фильмы, читать и проводить время в уютной атмосфере.",
            interests: ["Кино", "Чтение", "Творчество"],
            color: "#d59dbd"
        },

        {
            id: 3,
            name: "Виктория",
            surname: "Кузнецова",
            age: 19,
            gender: "female",
            direction: "Менеджмент · 1 курс",
            dorm: "Горняк-1",
            routine: "☀️ Жаворонок",
            about: "Обожаю путешествия, спорт и новые знакомства. Ценю личное пространство и уважение.",
            interests: ["Спорт", "Творчество", "Путешествия"],
            color: "#c6a0cf"
        },

        {
            id: 4,
            name: "Михаил",
            surname: "Орлов",
            age: 19,
            gender: "male",
            likesYou: true,
            direction: "Информатика · 2 курс",
            dorm: "Металлург-1",
            routine: "🌙 Сова",
            about: "Увлекаюсь технологиями, играми и спортом. Спокойный, уважаю чужое пространство.",
            interests: ["Игры", "Музыка", "Спорт"],
            color: "#8299ce"
        },

        {
            id: 5,
            name: "Даниил",
            surname: "Волков",
            age: 20,
            gender: "male",
            direction: "Прикладная информатика · 2 курс",
            dorm: "Металлург-1",
            routine: "🌙 Сова",
            about: "Люблю готовить, смотреть кино и проводить время с друзьями.",
            interests: ["Кулинария", "Кино", "Игры"],
            color: "#8eabc2"
        },

        {
            id: 6,
            name: "Артём",
            surname: "Смирнов",
            age: 18,
            gender: "male",
            direction: "Программная инженерия · 1 курс",
            dorm: "ДСГ-5",
            routine: "☀️ Жаворонок",
            about: "Интересуюсь технологиями, люблю прогулки и спокойную обстановку.",
            interests: ["Технологии", "Игры", "Прогулки"],
            color: "#9b9bcf"
        }

    ];

    // Определяем активный демонстрационный аккаунт

let matchMisisSession = null;

try {
    matchMisisSession = JSON.parse(
        localStorage.getItem("matchMisisSession")
    );
} catch (error) {
    matchMisisSession = null;
}

const STORAGE_KEY = matchMisisSession && matchMisisSession.id
    ? `matchMisisDemoV1_${matchMisisSession.id}`
    : "matchMisisDemoV1";
// ДЕМО-АККАУНТЫ ДЛЯ СВАЙП-ЛЕНТЫ

const demoStudents = [

    {
        id: "anna",
        fullName: "Анна Кузнецова",
        age: 18,
        gender: "female",
        direction: "Бизнес-информатика · 1 курс",
        color: "#b69cde"
    },

    {
        id: "pavel",
        fullName: "Павел Орлов",
        age: 19,
        gender: "male",
        direction: "Горное дело · 2 курс",
        color: "#8299ce"
    },

    {
        id: "elena",
        fullName: "Елена Смирнова",
        age: 19,
        gender: "female",
        direction: "Прикладная информатика · 2 курс",
        color: "#d59dbd"
    },

    {
        id: "dmitry",
        fullName: "Дмитрий Волков",
        age: 18,
        gender: "male",
        direction: "Программная инженерия · 1 курс",
        color: "#8eabc2"
    }

];

// Добавляем анкеты других аккаунтов

if (matchMisisSession) {

    demoStudents.forEach(student => {

        // Не показываем собственную анкету

        if (student.id === matchMisisSession.id) return;

        const profileKey = `matchMisisProfile_${student.id}`;

        let profileData = {};

        try {
            profileData = JSON.parse(
                localStorage.getItem(profileKey)
            ) || {};
        } catch (error) {
            profileData = {};
        }

        // Показываем только анкеты,
        // в которых уже есть заполненные данные

        const hasProfile = Boolean(
            profileData.dorm ||
            profileData.routine ||
            profileData.about ||
            (profileData.interests || []).length
        );

        if (!hasProfile) return;

        // Проверяем, поставил ли этот студент
        // лайк текущему пользователю

        let otherData = {};

        try {
            otherData = JSON.parse(
                localStorage.getItem(
                    `matchMisisDemoV1_${student.id}`
                )
            ) || {};
        } catch (error) {
            otherData = {};
        }

        const currentProfileId =
            `account_${matchMisisSession.id}`;

        const likesYou = (
            otherData.likedIds || []
        ).includes(currentProfileId);

        // Отображаем данные анкеты

        const routineLabels = {
            "Сова": "🌙 Сова",
            "Жаворонок": "☀️ Жаворонок",
            "Плавающий режим": "🕒 Плавающий режим"
        };

        profiles.push({

            id: `account_${student.id}`,

            accountId: student.id,

            name: student.fullName.trim().split(/\s+/)[0],
            surname: student.fullName.trim().split(/\s+/).slice(1).join(" "),

            age: student.age,

            gender: student.gender,

            likesYou: likesYou,

            direction: student.direction,

            dorm: profileData.dorm || "Не определено",

            routine:
                routineLabels[profileData.routine] ||
                "Режим не указан",

            about:
                profileData.about ||
                "Пока не добавил(а) описание.",

            interests: profileData.interests || [],
            photo: localStorage.getItem(
    `matchMisisPhoto_${student.id}`
) || "",
            color: student.color

        });

    });

}
    let savedData = {};

    try {
        savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (error) {
        savedData = {};
    }

    const likedIds = new Set(savedData.likedIds || []);
    const passedIds = new Set(savedData.passedIds || []);
// ИСТОРИЯ ПЕРЕПИСОК

const chatHistory = savedData.chatHistory || {};

let activeChatId = null;
    const viewerGender = document.getElementById("viewerGender");
    const dormFilter = document.getElementById("dormFilter");
    const interestFilter = document.getElementById("interestFilter");

    const card = document.getElementById("swipeCard");
    const initial = document.getElementById("swipeInitial");
    const cover = document.getElementById("swipeCover");
    const swipePhoto = document.getElementById("swipePhoto");
    const indicator = document.getElementById("swipeIndicator");

    const cardName = document.getElementById("cardName");
    const cardAge = document.getElementById("cardAge");
    const cardDirection = document.getElementById("cardDirection");
    const cardDormitory = document.getElementById("cardDormitory");
    const cardRoutine = document.getElementById("cardRoutine");
    const cardAbout = document.getElementById("cardAbout");
    const cardTags = document.getElementById("cardTags");

    const profileCounter = document.getElementById("profileCounter");
    const emptyState = document.getElementById("emptyState");
    const emptyTitle = document.getElementById("emptyTitle");
    const emptyDescription = document.getElementById("emptyDescription");
    const resetProfiles = document.getElementById("resetProfiles");
// ЭЛЕМЕНТЫ ИЗБРАННОГО И СОВПАДЕНИЙ

const favoritesList = document.getElementById("favoritesList");
const matchesList = document.getElementById("matchesList");

const favoritesEmpty = document.getElementById("favoritesEmpty");
const matchesEmpty = document.getElementById("matchesEmpty");

const matchNotice = document.getElementById("matchNotice");
const matchNoticeText = document.getElementById("matchNoticeText");

document.getElementById("closeMatchNotice").addEventListener(
    "click",
    () => {
        matchNotice.hidden = true;
        const messagesSection = document.getElementById("messages");
        if (messagesSection) {
            messagesSection.scrollIntoView({ behavior: "smooth" });
            renderChats();
        }
    }
);

// СОЗДАНИЕ КАРТОЧКИ В ИЗБРАННОМ

function getProfileFullName(profile) {
    return [profile.name, profile.surname].filter(Boolean).join(" ");
}

function createSocialCard(profile, isMatch) {

    const item = document.createElement("article");
    item.className = "social-profile-item";

    const avatar = document.createElement("div");
    avatar.className = "social-profile-avatar";
    avatar.style.background = profile.color;
    avatar.textContent = profile.name.charAt(0);

    const info = document.createElement("div");
    info.className = "social-profile-info";

    const name = document.createElement("h4");
    name.textContent = getProfileFullName(profile) + ", " + profile.age;

    const direction = document.createElement("p");
    direction.textContent = profile.direction;

    const status = document.createElement("span");
    status.className = "social-status";

    status.textContent = isMatch
        ? "💜 У вас совпадение"
        : "♡ Тебе понравилась анкета";

    info.append(name, direction, status);
    item.append(avatar, info);

    return item;
}

// ОБНОВЛЕНИЕ ИЗБРАННОГО И СОВПАДЕНИЙ

function renderSocialSections() {

    const favorites = profiles.filter(profile =>
        likedIds.has(profile.id)
    );

    // В демонстрации каждый поставленный лайк сразу считается совпадением.
    const matches = favorites;

    favoritesList.replaceChildren();
    matchesList.replaceChildren();

    favorites.forEach(profile => {

        favoritesList.appendChild(
            createSocialCard(profile, true)
        );

    });

    matches.forEach(profile => {

        matchesList.appendChild(
            createSocialCard(profile, true)
        );

    });

    favoritesEmpty.hidden = favorites.length > 0;
    matchesEmpty.hidden = matches.length > 0;

}

// УВЕДОМЛЕНИЕ О ВЗАИМНОМ ЛАЙКЕ

function showMatchNotice(profile) {

    matchNoticeText.textContent =
        "У вас совпадение с " + profile.name +
        "! Теперь можно начать общение в сообщениях.";

    matchNotice.hidden = false;

}
    const detailsButton = document.getElementById("detailsButton");
    const profileDialog = document.getElementById("profileDialog");

    let currentProfile = null;
    let isAnimating = false;
    let startX = 0;
    let isDragging = false;

    if (!card || !viewerGender) return;

    // Восстанавливаем настройки демо-профиля
    viewerGender.value =
    matchMisisSession?.gender ||
    savedData.viewerGender ||
    "female";

viewerGender.disabled = Boolean(matchMisisSession);

    function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        viewerGender: viewerGender.value,
        likedIds: [...likedIds],
        passedIds: [...passedIds],
        chatHistory: chatHistory
    }));
}

    // ФИЛЬТРАЦИЯ АНКЕТ

    function getBaseFilteredProfiles() {

        return profiles.filter(profile => {

            // Обязательное совпадение по полу
            if (profile.gender !== viewerGender.value) {
                return false;
            }

            // Фильтр по общежитию
            if (
                dormFilter.value !== "all" &&
                profile.dorm !== dormFilter.value
            ) {
                return false;
            }

            // Фильтр по интересам
            if (
                interestFilter.value !== "all" &&
                !profile.interests.includes(interestFilter.value)
            ) {
                return false;
            }

            return true;
        });
    }

    function getAvailableProfiles() {

        return getBaseFilteredProfiles().filter(profile => {
            return !likedIds.has(profile.id) &&
                   !passedIds.has(profile.id);
        });

    }

    // ДОБАВЛЕНИЕ ТЕГОВ

    function showTags(container, tags) {

        container.replaceChildren();

        tags.forEach(tag => {

            const element = document.createElement("span");
            element.textContent = tag;

            container.appendChild(element);

        });

    }

    // ПОКАЗ КАРТОЧКИ

    function renderProfile() {

        const available = getAvailableProfiles();
        const base = getBaseFilteredProfiles();

        indicator.className = "swipe-indicator";
        indicator.textContent = "";

        if (available.length === 0) {

            card.hidden = true;
            emptyState.hidden = false;

            profileCounter.textContent = "Анкет: 0";

            if (base.length === 0) {

                emptyTitle.textContent = "Анкет не найдено";
                emptyDescription.textContent =
                    "Попробуй выбрать другое общежитие или интересы.";

                resetProfiles.hidden = true;

            } else {

                emptyTitle.textContent = "Ты просмотрела все анкеты";
                emptyDescription.textContent =
                    "Можно посмотреть пропущенные анкеты ещё раз.";

                const hasPassed = base.some(profile =>
                    passedIds.has(profile.id)
                );

                resetProfiles.hidden = !hasPassed;

            }

            currentProfile = null;
            return;
        }

        currentProfile = available[0];

        card.hidden = false;
        emptyState.hidden = true;

        card.style.transition = "transform 0.25s ease";
        card.style.transform = "translateX(0) rotate(0)";

        initial.textContent = currentProfile.name.charAt(0);

if (currentProfile.photo) {
    swipePhoto.src = currentProfile.photo;
    swipePhoto.hidden = false;
    initial.hidden = true;
} else {
    swipePhoto.hidden = true;
    swipePhoto.removeAttribute("src");
    initial.hidden = false;
}
        cover.style.background =
            `linear-gradient(135deg, ${currentProfile.color}, #eee4f9)`;

        cardName.textContent = getProfileFullName(currentProfile);
        cardAge.textContent = currentProfile.age;

        cardDirection.textContent = currentProfile.direction;
        cardDormitory.textContent =
            "🏠 " + currentProfile.dorm;

        cardRoutine.textContent = currentProfile.routine;

        cardAbout.textContent = currentProfile.about;

        showTags(cardTags, currentProfile.interests);

        profileCounter.textContent =
            "Подходящих анкет осталось: " + available.length;

    }

    // ЛАЙК ИЛИ ПРОПУСК

    function markProfile(action) {

        if (!currentProfile || isAnimating) return;

        isAnimating = true;

        const profile = currentProfile;
        const direction = action === "like" ? 1 : -1;

        card.style.transition = "transform 0.22s ease";
        card.style.transform =
            `translateX(${direction * 600}px) rotate(${direction * 20}deg)`;

        indicator.textContent =
            action === "like" ? "LIKE" : "NOPE";

        indicator.className =
            "swipe-indicator visible " + action;

        setTimeout(() => {

            if (action === "like") {

    likedIds.add(profile.id);

    // В демо каждый лайк сразу считается совпадением.
    showMatchNotice(profile);

} else {

    passedIds.add(profile.id);

}

saveState();
renderSocialSections();

            card.style.transition = "none";
            card.style.transform = "translateX(0) rotate(0)";

            isAnimating = false;

            renderProfile();

        }, 230);

    }

    document.getElementById("likeButton").addEventListener(
        "click",
        () => markProfile("like")
    );

    document.getElementById("passButton").addEventListener(
        "click",
        () => markProfile("pass")
    );

    // СВАЙП МЫШКОЙ ИЛИ ПАЛЬЦЕМ

    card.addEventListener("pointerdown", event => {

        if (isAnimating || event.target.closest("button")) return;

        startX = event.clientX;
        isDragging = true;

        card.setPointerCapture(event.pointerId);
        card.style.transition = "none";

    });

    card.addEventListener("pointermove", event => {

        if (!isDragging || isAnimating) return;

        const difference = event.clientX - startX;

        card.style.transform =
            `translateX(${difference}px) rotate(${difference / 20}deg)`;

        if (difference > 35) {

            indicator.textContent = "LIKE";
            indicator.className = "swipe-indicator visible like";

        } else if (difference < -35) {

            indicator.textContent = "NOPE";
            indicator.className = "swipe-indicator visible pass";

        } else {

            indicator.className = "swipe-indicator";

        }

    });

    card.addEventListener("pointerup", event => {

        if (!isDragging) return;

        isDragging = false;

        const difference = event.clientX - startX;

        if (difference > 100) {

            markProfile("like");

        } else if (difference < -100) {

            markProfile("pass");

        } else {

            card.style.transition = "transform 0.2s ease";
            card.style.transform = "translateX(0) rotate(0)";
            indicator.className = "swipe-indicator";

        }

    });

    card.addEventListener("pointercancel", () => {

        isDragging = false;

        card.style.transition = "transform 0.2s ease";
        card.style.transform = "translateX(0) rotate(0)";
        indicator.className = "swipe-indicator";

    });

    // ФИЛЬТРЫ

    viewerGender.addEventListener("change", () => {
    saveState();
    renderProfile();
    renderChats();
});

    dormFilter.addEventListener("change", renderProfile);
    interestFilter.addEventListener("change", renderProfile);

    // ВОЗВРАЩАЕМ ПРОПУЩЕННЫЕ АНКЕТЫ

    resetProfiles.addEventListener("click", () => {

        const base = getBaseFilteredProfiles();

        base.forEach(profile => {
            passedIds.delete(profile.id);
        });

        saveState();
        renderProfile();

    });

    // ПОДРОБНАЯ АНКЕТА

    detailsButton.addEventListener("click", () => {

        if (!currentProfile) return;

        document.getElementById("dialogName").textContent =
            getProfileFullName(currentProfile) + ", " + currentProfile.age;

        document.getElementById("dialogDirection").textContent =
            currentProfile.direction;

        document.getElementById("dialogDorm").textContent =
            "Общежитие: " + currentProfile.dorm;

        document.getElementById("dialogRoutine").textContent =
            currentProfile.routine;

        document.getElementById("dialogAbout").textContent =
            currentProfile.about;

        showTags(
            document.getElementById("dialogTags"),
            currentProfile.interests
        );

        profileDialog.showModal();

    });

    document.getElementById("closeProfileDialog").addEventListener(
        "click",
        () => profileDialog.close()
    );

    profileDialog.addEventListener("click", event => {

        if (event.target === profileDialog) {
            profileDialog.close();
        }

    });
    // MATCH MISIS — СИСТЕМА ЧАТОВ

const chatList = document.getElementById("chatList");
const chatEmpty = document.getElementById("chatEmpty");

const chatPlaceholder =
    document.getElementById("chatPlaceholder");

const chatActive =
    document.getElementById("chatActive");

const chatMessagesElement =
    document.getElementById("chatMessages");

const chatForm =
    document.getElementById("chatForm");

const chatInput =
    document.getElementById("chatInput");

const chatName =
    document.getElementById("chatName");

const chatAvatar =
    document.getElementById("chatAvatar");

// Получаем взаимные совпадения

function getChatMatches() {

    return profiles.filter(profile =>
        profile.gender === viewerGender.value &&
        likedIds.has(profile.id)
    );

}

// Время сообщения

function getMessageTime() {

    return new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit"
    });

}

// Обновляем список диалогов

function renderChats() {

    if (!chatList) return;

    const matches = getChatMatches();

    chatList.replaceChildren();

    matches.forEach(profile => {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "chat-list-item";

        if (activeChatId === profile.id) {
            button.classList.add("active");
        }

        const avatar = document.createElement("div");

        avatar.className = "chat-list-avatar";
        avatar.style.background = profile.color;
        avatar.textContent = profile.name.charAt(0);

        const info = document.createElement("div");

        info.className = "chat-list-info";

        const name = document.createElement("strong");

        name.textContent = getProfileFullName(profile);

        const preview = document.createElement("span");

        const history = chatHistory[profile.id] || [];

        preview.textContent = history.length
            ? history[history.length - 1].text
            : "Начать общение";

        info.append(name, preview);

        button.append(avatar, info);

        button.addEventListener("click", () => {
            openChat(profile);
        });

        chatList.appendChild(button);

    });

    chatEmpty.hidden = matches.length > 0;

    // Проверяем, остался ли активный чат доступен
    if (
        activeChatId !== null &&
        !matches.some(profile => profile.id === activeChatId)
    ) {
        activeChatId = null;
    }

    if (activeChatId === null) {

        chatActive.hidden = true;
        chatPlaceholder.hidden = false;

    } else {

        chatPlaceholder.hidden = true;
        chatActive.hidden = false;

        renderChatMessages();

    }

}

// Открытие переписки

function openChat(profile) {

    activeChatId = profile.id;

    // Новая переписка начинается без автоматического приветствия.
    if (!chatHistory[profile.id]) {
        chatHistory[profile.id] = [];
    }
    // Удаляем старое автоматическое приветствие из ранее сохранённой демо-истории.
    if (chatHistory[profile.id].length === 1 &&
        chatHistory[profile.id][0].sender === "other" &&
        /^Привет! Рад[а]? (нашему совпадению|что мы совпали)/i.test(chatHistory[profile.id][0].text)) {
        chatHistory[profile.id] = [];
    }
    saveState();

    chatName.querySelector("strong").textContent =
        getProfileFullName(profile) + ", " + profile.age;
    chatName.dataset.profileId = profile.id;

    chatAvatar.textContent =
        profile.name.charAt(0);

    chatAvatar.style.background = profile.color;

    renderChats();

    chatInput.focus();

}

// Открытие анкеты собеседника прямо из шапки чата
// Предложение совместного проживания — компактный демо-сценарий без отдельного блока в чате.
const proposeCohabitationButton = document.getElementById("proposeCohabitation");
if (proposeCohabitationButton) {
    proposeCohabitationButton.addEventListener("click", () => {
        if (activeChatId === null) {
            alert("Сначала выбери собеседника.");
            return;
        }

        const profile = getChatMatches().find(item => String(item.id) === String(activeChatId));
        if (!profile) {
            alert("Не удалось найти анкету собеседника.");
            return;
        }

        const accepted = window.confirm(`Отправить ${getProfileFullName(profile)} предложение жить вместе?`);
        if (!accepted) return;

        const secondApproval = window.confirm("Демо-режим: смоделировать согласие собеседника? Если он согласен, будет сформирована совместная заявка.");
        if (!secondApproval) {
            alert("Предложение отправлено. В реальном сервисе здесь ожидалось бы подтверждение второго студента.");
            return;
        }

        const content = [
            "ЗАЯВКА НА РАССМОТРЕНИЕ СОВМЕСТНОГО ЗАСЕЛЕНИЯ",
            "",
            `Студент 1: ${getProfileFullName(profile)}`,
            `Возраст: ${profile.age}`,
            `Направление: ${profile.direction}`,
            `Общежитие: ${profile.dorm}`,
            "",
            "Студент 2: демонстрационный пользователь MATCH MISIS",
            "",
            "Оба участника выразили согласие в демонстрационном прототипе.",
            "Документ не является официальной заявкой и не отправляется в МИСИС.",
            "Порядок подачи необходимо уточнить в дирекции общежития."
        ].join("\n");

        const blob = new Blob(["\ufeff", content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "MATCH_MISIS_совместная_заявка.txt";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        alert("Демо-заявка сформирована и скачана.");
    });
}

chatName.addEventListener("click", () => {
    const profile = getChatMatches().find(item => String(item.id) === chatName.dataset.profileId);
    if (!profile) return;
    document.getElementById("dialogName").textContent =
        getProfileFullName(profile) + ", " + profile.age;
    document.getElementById("dialogDirection").textContent = profile.direction;
    document.getElementById("dialogDorm").textContent = "Общежитие: " + profile.dorm;
    document.getElementById("dialogRoutine").textContent = profile.routine;
    document.getElementById("dialogAbout").textContent = profile.about;
    showTags(document.getElementById("dialogTags"), profile.interests);
    profileDialog.showModal();
});

// Отображение сообщений

function renderChatMessages() {

    const history = chatHistory[activeChatId] || [];

    chatMessagesElement.replaceChildren();

    history.forEach(message => {

        const row = document.createElement("div");

        row.className =
            "chat-message-row " +
            (message.sender === "me" ? "mine" : "other");

        const bubble = document.createElement("div");

        bubble.className = "chat-bubble";

        const text = document.createElement("div");

        text.textContent = message.text;

        const time = document.createElement("span");

        time.className = "chat-time";
        time.textContent = message.time;

        bubble.append(text, time);

        row.appendChild(bubble);

        chatMessagesElement.appendChild(row);

    });

    chatMessagesElement.scrollTop =
        chatMessagesElement.scrollHeight;

}

// Отправка сообщения

chatForm.addEventListener("submit", event => {

    event.preventDefault();

    const text = chatInput.value.trim();

    if (!text || activeChatId === null) return;

    const profile = profiles.find(
        item => item.id === activeChatId
    );

    if (!profile) return;

    if (!chatHistory[activeChatId]) {
        chatHistory[activeChatId] = [];
    }

    // Добавляем своё сообщение

    chatHistory[activeChatId].push({
        sender: "me",
        text: text,
        time: getMessageTime()
    });

    chatInput.value = "";

    saveState();
    renderChats();

    // Автоматический ответ собеседника — имитация переписки в учебном прототипе.
    const replies = [
        "Привет! Рада знакомству 😊",
        "Здорово, что мы совпали! Расскажешь немного о себе?",
        "А в каком общежитии ты планируешь жить?",
        "Мне тоже важно, чтобы в комнате было комфортно и спокойно.",
        "Класс! Кажется, у нас есть общие интересы 💜"
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    const replyChatId = activeChatId;

    window.setTimeout(() => {
        if (!chatHistory[replyChatId]) chatHistory[replyChatId] = [];
        chatHistory[replyChatId].push({
            sender: "other",
            text: reply,
            time: getMessageTime()
        });
        saveState();
        if (activeChatId === replyChatId) {
            renderChats();
        }
    }, 900);

});

// Начальная отрисовка чатов

renderSocialSections();
renderChats();
renderProfile();

// Обновление чатов при открытии вкладки

document.querySelectorAll('a[href="#messages"]').forEach(link => {
    link.addEventListener("click", () => {
        renderChats();
    });
});

})();
// MATCH MISIS — АВТОРИЗАЦИЯ И ЛИЧНЫЙ КАБИНЕТ

(() => {

    const DEMO_ACCOUNTS = [
        {
            id: "anna",
            email: "anna@misis.demo",
            password: "demo123",
            fullName: "Анна Кузнецова",
            gender: "female",
            genderLabel: "Женский",
            institute: "Институт компьютерных наук",
            direction: "Бизнес-информатика",
            course: "1 курс"
        },
        {
            id: "pavel",
            email: "pavel@misis.demo",
            password: "demo123",
            fullName: "Павел Орлов",
            gender: "male",
            genderLabel: "Мужской",
            institute: "Горный институт",
            direction: "Горное дело",
            course: "2 курс"
        },
        {
            id: "elena",
            email: "elena@misis.demo",
            password: "demo123",
            fullName: "Елена Смирнова",
            gender: "female",
            genderLabel: "Женский",
            institute: "Институт компьютерных наук",
            direction: "Прикладная информатика",
            course: "2 курс"
        },
        {
            id: "dmitry",
            email: "dmitry@misis.demo",
            password: "demo123",
            fullName: "Дмитрий Волков",
            gender: "male",
            genderLabel: "Мужской",
            institute: "Институт компьютерных наук",
            direction: "Программная инженерия",
            course: "1 курс"
        }
    ];

    const loginScreen = document.getElementById("loginScreen");
    const loginForm = document.getElementById("loginForm");
    const loginError = document.getElementById("loginError");

    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    const accountProfileForm =
        document.getElementById("accountProfileForm");

    const logoutButton =
        document.getElementById("logoutButton");

    const photoInput =
        document.getElementById("accountPhoto");

    const photoPreview =
        document.getElementById("accountPhotoPreview");

    const accountFields = {
        fio: document.getElementById("accountFio"),
        gender: document.getElementById("accountGender"),
        institute: document.getElementById("accountInstitute"),
        direction: document.getElementById("accountDirection"),
        course: document.getElementById("accountCourse"),
        login: document.getElementById("accountLoginLabel")
    };

    function getSession() {
        try {
            return JSON.parse(
                localStorage.getItem("matchMisisSession")
            );
        } catch (error) {
            return null;
        }
    }

    function getAccountProfileKey(accountId) {
        return `matchMisisProfile_${accountId}`;
    }

    // ЗАПОЛНЕНИЕ ЛИЧНОГО КАБИНЕТА

    function initializeAccount(account) {

        loginScreen.hidden = true;

        accountFields.fio.value = account.fullName;
        accountFields.gender.value = account.genderLabel;
        accountFields.institute.value = account.institute;
        accountFields.direction.value = account.direction;
        accountFields.course.value = account.course;
        accountFields.login.value = account.email;

        let savedProfile = {};

        try {
            savedProfile = JSON.parse(
                localStorage.getItem(
                    getAccountProfileKey(account.id)
                )
            ) || {};
        } catch (error) {
            savedProfile = {};
        }

        document.getElementById("accountDorm").value =
            savedProfile.dorm || "";

        document.getElementById("accountRoutine").value =
            savedProfile.routine || "";

        document.getElementById("accountAbout").value =
            savedProfile.about || "";

        const selectedInterests = savedProfile.interests || [];

        document.querySelectorAll(
            "#accountInterests input[type='checkbox']"
        ).forEach(checkbox => {

            checkbox.checked =
                selectedInterests.includes(checkbox.value);

        });

        // ВОССТАНАВЛИВАЕМ ФОТОГРАФИЮ

        const savedPhoto = localStorage.getItem(
            `matchMisisPhoto_${account.id}`
        );

        if (savedPhoto) {
            photoPreview.src = savedPhoto;
            photoPreview.hidden = false;
        } else {
            photoPreview.removeAttribute("src");
            photoPreview.hidden = true;
        }

    }

    // ВХОД

    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        const email = loginEmail.value.trim().toLowerCase();
        const password = loginPassword.value;

        const account = DEMO_ACCOUNTS.find(item =>
            item.email === email &&
            item.password === password
        );

        if (!account) {
            loginError.textContent =
                "Неверный логин или пароль. Проверь данные.";
            return;
        }

        const session = {
            id: account.id,
            email: account.email,
            fullName: account.fullName,
            gender: account.gender,
            institute: account.institute,
            direction: account.direction,
            course: account.course
        };

        localStorage.setItem(
            "matchMisisSession",
            JSON.stringify(session)
        );

        location.reload();

    });

    // СОХРАНЕНИЕ АНКЕТЫ

    accountProfileForm.addEventListener("submit", event => {

        event.preventDefault();

        const session = getSession();

        if (!session) return;

        const interests = [];

        document.querySelectorAll(
            "#accountInterests input[type='checkbox']"
        ).forEach(checkbox => {

            if (checkbox.checked) {
                interests.push(checkbox.value);
            }

        });

        const profile = {
            dorm: document.getElementById("accountDorm").value,
            routine: document.getElementById("accountRoutine").value,
            about: document.getElementById("accountAbout").value.trim(),
            interests: interests
        };

        localStorage.setItem(
            getAccountProfileKey(session.id),
            JSON.stringify(profile)
        );

        document.getElementById("profileSaveMessage").textContent =
            "Анкета успешно сохранена!";

    });

    // СЖАТИЕ ФОТОГРАФИИ

    function compressPhoto(file) {

        return new Promise((resolve, reject) => {

            const reader = new FileReader();

            reader.onload = () => {

                const image = new Image();

                image.onload = () => {

                    const scale = Math.min(
                        1,
                        500 / Math.max(image.width, image.height)
                    );

                    const canvas = document.createElement("canvas");

                    canvas.width =
                        Math.round(image.width * scale);

                    canvas.height =
                        Math.round(image.height * scale);

                    const context = canvas.getContext("2d");

                    context.drawImage(
                        image,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                    resolve(
                        canvas.toDataURL("image/jpeg", 0.75)
                    );

                };

                image.onerror = reject;
                image.src = reader.result;

            };

            reader.onerror = reject;
            reader.readAsDataURL(file);

        });

    }

    // ЗАГРУЗКА ФОТОГРАФИИ

    photoInput.addEventListener("change", async () => {

        const session = getSession();
        const file = photoInput.files[0];

        if (!session || !file) return;

        if (!file.type.startsWith("image/")) {
            alert("Выбери изображение.");
            return;
        }

        try {

            const photo = await compressPhoto(file);

            localStorage.setItem(
                `matchMisisPhoto_${session.id}`,
                photo
            );

            photoPreview.src = photo;
            photoPreview.hidden = false;

            document.getElementById("profileSaveMessage").textContent =
                "Фотография сохранена!";

        } catch (error) {

            alert("Не удалось загрузить фотографию.");

        }

    });

    // ВЫХОД ИЗ АККАУНТА

    logoutButton.addEventListener("click", () => {

        const confirmed = confirm(
            "Выйти из личного кабинета?"
        );

        if (!confirmed) return;

        localStorage.removeItem("matchMisisSession");

        location.reload();

    });

    // ПРОВЕРКА АВТОРИЗАЦИИ

    const currentSession = getSession();

    const currentAccount = DEMO_ACCOUNTS.find(account =>
        account.id === currentSession?.id
    );

    if (currentAccount) {

        initializeAccount(currentAccount);

    } else {

        localStorage.removeItem("matchMisisSession");
        loginScreen.hidden = false;

    }

})();
