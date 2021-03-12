function logout()
{
    localStorage.clear();
    location.href="/";
}

$("#username").html(`Welcome ${localStorage.username}`)