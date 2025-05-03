function isInputValid(inputId, inputErrorId) {
    var hebrewRegex = /[\u0590-\u05FF]+/; //בדיקת טקסט עברית
    var value = document.getElementById(inputId).value //מקבל את התוכן של השדה לפי ה- inputId

    if (!isNaN(value)) { //בודקת שהתוכן לא מספר
        document.getElementById(inputErrorId).innerHTML = "יש למלא אותיות בלבד";
        return false;
    } else if (!hebrewRegex.test(value)) {
        document.getElementById(inputErrorId).innerHTML = "יש למלא אותיות בעברית בלבד";
        return false;
    }

    return true;
}

function validateForm() {
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var typeSelected = document.querySelector('input[name="type"]:checked');
    var stoneSelected = document.querySelector('input[name="stone"]:checked');
    var orderButton = document.getElementById('send');

    var isFormFilled = fname !== "" && lname !== "" && typeSelected !== null && stoneSelected !== null; //בדיקה שהשדות חובה מולאו
    var isFNameValid; // משתנים עבור תקינות השדות של השם הפרטי והמשפחה
    var isLNameValid;

    if (fname !== "") { // אנחנו קודם בודקות האם השם הפרטי מולא בכלל אם כן אז נמשיך
        isFNameValid = isInputValid("fname", "fNameError"); // קריאה לפוקנציה שבודקת האם השדה תקין, במידה ולא ישנה השמה של הודעת שגיאה מתחת לשדה הרלוונטי
        if (isFNameValid) { // במידה והשדה מולא בצורה תקינה אז נמחק הודעת שגיאה אם הייתה כזו
            document.getElementById("fNameError").innerHTML = "";
        }
    }
    if (lname !== "") { // בדומה למקודם נבדוק אם השדה של השם משפחה מולא
        isLNameValid = isInputValid("lname", "lNameError") // נקרא לפונקציה שבודקת האם השדה תקין, במידה ולא אז ישנה השמה של הודעת שגיאה.
        if (isLNameValid) { // במידה והשדה מולא בצורה תקינה אז נמחק הודעת שגיאה אם הייתה כזו
            document.getElementById("lNameError").innerHTML = "";
        }
    }

    
    if (isFormFilled && isFNameValid && isLNameValid) { //בודק האם הערך הוא true או false כלומר האם השדות חובה מולאו
        orderButton.style.opacity = 1;
        orderButton.style.cursor = 'pointer'; //מאפשר שיהיה לחיץ 
        orderButton.disabled = false;
    }
    else {
        orderButton.style.opacity = 0.5;
        orderButton.style.cursor = 'not-allowed'; //הופך את הכפתור ללא לחיץ
        orderButton.disabled = true;
    }
}

function hideElements(elementsIds) { //  מקבלת מערך של id ומעלימה אותם מהמסך 
    for (i = 0; i < elementsIds.length; i++) {
        var element = document.getElementById(elementsIds[i]);
        element.style.opacity = 0; // ברירת מחדל: שקיפות חלקית
    }
}

function makeImageVisibleBy(elementsNodes) { //מקבלת אלמנטים של html וסורקת האם צריך לעשות אלמנטים אחרים לפי ה-value של מה שנבחר נראה
    for (i = 0; i < elementsNodes.length; i++) {
        if (elementsNodes[i].checked) {
            var selectedImage = document.getElementById(elementsNodes[i].value);
            selectedImage.style.opacity = 1; // שקיפות מלאה לתמונה שנבחרה
        }
    }
}

function SwitchToolOpacity() { //סורקת את התיבות צ'ק בוקס ברגע שלוחצים על אחת מהן והיא בודקת איזה אלמנטים לעדכן למצב מלא (1) או להשאיר לשקיפות 0.5. 
    //של כלי עבודה
    var checkboxes = document.querySelectorAll('.checkboxbutton');

    for (i = 0; i < checkboxes.length; i++) {
        var imgElement = document.getElementById(checkboxes[i].value);

        if (checkboxes[i].checked) {
            imgElement.style.opacity = 1;
        } else {
            imgElement.style.opacity = 0.5;
        }
    }
}

function ShowStoneImage() { //תליונים
    var radioButtons = document.querySelectorAll('.radiobuttonsstone');
    var imagesIds = ['רוז קוורץ', 'אמטיסט', 'אקוומרין', 'ספיר'];

    hideElements(imagesIds); //העלמת תליונים
    makeImageVisibleBy(radioButtons) //הצגת התליון הרלוונטי
}

function ShowNecklessImage() { //של שרשרת
    var radioButtons = document.querySelectorAll('.radiobuttonsstring');
    var imagesIds = ['זהב', 'כסף'];

    hideElements(imagesIds)
    makeImageVisibleBy(radioButtons)
}

function resetIcons() { //מאפס את כל התמונות  לברירת מחדל לאחר כפתור האישור (כלומר לאחר שהכפתור אישור רואה שהכל תקין) 
    var imageIdsToHide = ['רוז קוורץ', 'אמטיסט', 'אקוומרין', 'ספיר', 'זהב', 'כסף']; //מערך שמכיל את כל ה-id של התמונות שישמש אותנו להחזרת כל התמונות לחוסר נראות. 
    hideElements(imageIdsToHide); 

    var imagesToFade = document.querySelectorAll('.checkboxbutton'); //מערך שמכיל את כל האלמנטים של הכלים שישמש להחזרת כל האלמנטים למצב הברירת מחדל (0.5) 
    for (i = 0; i < imagesToFade.length; i++) {
        var imgElement = document.getElementById(imagesToFade[i].value);

        imgElement.style.opacity = 0.5;
    }

    var orderButton = document.getElementById('send');
    orderButton.style.opacity = 0.5;
    orderButton.style.cursor = 'not-allowed';
    orderButton.disabled = true;
}

function collectOrderDetails() { //אוספת את הזמנה ושולחת אותה למשלוח
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var typeSelected = document.querySelector('input[name="type"]:checked').value;
    var stoneSelected = document.querySelector('input[name="stone"]:checked').value;

    var selectedTools = [];
    var checkboxes = document.querySelectorAll('.checkboxbutton');

    for (i = 0; i < checkboxes.length; i++) { //סורקת את הצק בוקסים של הכלים ומוסיפה את הערך שלהם בשביל להציג בסוף את ההודעה אם הכלים שנעשה בהם שימוש
        if (checkboxes[i].checked) {
            selectedTools.push(checkboxes[i].value);
        }
    }

   var popupText= "השרשרת של: " + fname + " " + lname + " " + "סוג החוט שלך: " + typeSelected + " " + "התליון שלך: " + stoneSelected + " " + "תוספות: " + selectedTools ;
    var popup = document.getElementById('myPopup');
    popup.textContent = popupText; // עדכון תוכן ההודעה
    document.getElementById('popupText').textContent = popupText;
    
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('myPopup').value = '';
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    for (i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    resetIcons();//איפוס
    
}
