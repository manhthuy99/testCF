//A. Problem solving
// 1. Viết một hàm nhập vào 2 mảng A1 và A2, đầu ra trả về một mảng mới chứa các phần tử không trùng nhau của hai mảng kia. Ví dụ A1 = [1, 2, "a"]; A2 = [1, 3, "b"] thì output ra được là [2, "a", "b", 3].

const a1 = [1, 2, 'a'];
const a2 = [1, 3, 'b'];

function findUnique(arr1, arr2) {
    let unique1 = arr1.filter((ele) => arr2.indexOf(ele) === -1);
    let unique2 = arr2.filter((ele) => arr1.indexOf(ele) === -1);
    let result = unique1.concat(unique2);
    console.log(result);
    return result;
}

findUnique(a1, a2);

// 2. Viết chương trình xếp hạng rank theo số điểm các đội bóng đạt được trong giải đấu. Biết rằng tên của các đội bóng không thể trùng nhau, nếu số điểm trùng nhau thì xếp đội xếp trên có hiệu số bàn thắng bại (GD: Goal Difference) ít hơn, rồi mới xét đến Alphabet nếu 2 đội trùng cả điểm số lẫn hiệu số bàn thắng.

const arr = [
    {
        name: 'Arsenal',
        points: 60,
        GD: 45
    },
    {
        name: 'Chelsea',
        points: 90,
        GD: 39
    },
    {
        name: 'MU',
        points: 75,
        GD: 29
    },
    {
        name: 'Liverpool',
        points: 88,
        GD: 39
    },
    {
        name: 'MC',
        points: 75,
        GD: 32
    },
]

function sortTable(list) {
    list.sort((a,b) => compare(a,b));
    function compare(a,b) {
        //compare points
        let points = b.points -a.points;
        if (points !== 0) return points;

        //compare GD
        let GD = b.GD - a.GD;
        if (GD !== 0) return b.GD - a.GD;

        //compare alphabets
        if (b.name > a.name) {
            return -1;
        } else return 1
    }
    console.log(list);
    return list;
}

sortTable(arr);



//B. Coding Challenge
// Xây dựng Quiz app(App câu đố) đơn giản về bóng đá với APIs sau https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple
// APIs bao gồm câu hỏi, đáp án đúng, danh sách đáp án sai và nhiệm vụ của bạn là xây dựng sản phẩm từ dữ liệu đó đạt các tiêu chí đánh giá sau:
// - Có các tính năng:
// 		+) Lấy được dữ liệu từ APIs.
// 		+) Hiển thị được toàn bộ dữ liệu từ APIs dưới dạng câu hỏi và đáp án.
// 		+) Khi trả lời đúng được 10 điểm kèm thông báo, sai được 0 điểm kèm thông báo. Và hiển thị toàn bộ số điểm người dùng đạt được.
// - Có CSS, phát triển trên màn hình di động trước thay vì phát triển trên web
// - Tối ưu hóa code, tái sử dụng được càng nhiều code càng tốt( tái sử dụng hàm, tái sử dụng các component tạo sẵn).
// - Commit Code lên Github sẽ được cộng điểm vào tổng số điểm cả bài thi.

let totalScore = 0;
let answerAll = [];
let currentQuestion = 0;

function $(element) {
    return document.querySelector(element);
}

async function getQuestion(api) {
    const response = await fetch(api);
    const data = await response.json();
    answerAll = data.results[currentQuestion].correct_answer.concat(',',data.results[currentQuestion].incorrect_answers).split(',');
    $('#content-question').innerHTML = data.results[currentQuestion].question;
    let randomArray = randomPosition();
    $('#option-1').innerHTML = answerAll[randomArray[0]];
    $('#option-2').innerHTML = answerAll[randomArray[1]];
    $('#option-3').innerHTML = answerAll[randomArray[2]];
    $('#option-4').innerHTML = answerAll[randomArray[3]];

}

function randomPosition() {
    let arr = [];
    let random = Math.floor(Math.random()*4);
    for (let i = 0; i < 4; i++) {
        while (arr.includes(random)) {
            random = Math.floor(Math.random()*4)
        }
        arr.push(random);
    }
    return arr;
}


document.querySelectorAll('.option').forEach(item => item.addEventListener('click', answerHandler));

function answerHandler() {

    if (this.textContent == answerAll[0]) {
        totalScore += 10;
        $('#total-score').innerHTML = totalScore;

        $('#inform').innerHTML = 'Đúng rồi. +10 điểm'
        $('#inform').classList.add('right');
        $('#inform').classList.remove('wrong');
    } else {
        $('#inform').innerHTML = 'Sai rồi. Không được điểm nào!';
        $('#inform').classList.add('wrong');
        $('#inform').classList.remove('right');
    }

    setTimeout(nextQuestion, 700)
}

$('#view-result').addEventListener('click', showAnswer);
$('#next-question').addEventListener('click', nextQuestion);

function showAnswer() {
    $('#show-answer').innerHTML = answerAll[0]
}

function nextQuestion() {
    currentQuestion++;
    getQuestion('https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple');
    $('#inform').innerHTML = '';
    $('#show-answer').innerHTML = '';
    if (currentQuestion === 4) {
        $('.container').innerHTML = '<h2>Hết câu hỏi rồi.</h2>'
    }
}

getQuestion('https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple');
