// get / post / patch / delete
//              수정   / 삭제

// 사용자 이름을 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach((el)=>{
    el.addEventListener('click',()=>{
        const id = el.querySelector('td').textContent;
        getComment(id);
    });
});

// 사용자 로딩
async function getUser(){
    try{
        const res = await axios.get('/users');
        const users = res.data;
        console.log(users);
        const tbody = document.querySelector('#user-list tbody');
        tbody.innerHTML = '';
        users.map((user)=>{
            const row = document.createElement('tr');
            row.addEventListener('click',()=>{
                getComment(user.id);
            });

            // 로우 셀 추가
            let td = document.createElement('td');
            td.textContent = user.id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.age;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.married ? '기혼' : '미혼';
            row.appendChild(td);
            tbody.appendChild(row);

        });

    }catch(err){
        console.error(err);
    }
}