-----> in /signin/verify route, give name,email,password
----->we have 2 databases called users,verifyusers
-----> If the user already exists in User database it will return false
-----> if not exists in users db, it will return true and will send an email to given email
-----> if we click the link in email , we can see the link with json token and registration success message
 if we click the link in email or give localhost:4000/:token in postman  it will check if the token is in verify user database.
 -----> if it exists it will delete that and store it on the user database.then we will receive registration success email.
 -----> when we try to login for the first time it is authentication. login with email and password.it will check email and password exists and we will get token as response this token will replace the token already in user database and also will set as token in redis. We use redis for session management.
 -----> Paste this token in headers authorization. 
 ----> go to /home route 
 -----> after first login we need authorization, we will check token of headers authorixation with token in redis or mongodb database and will return data.
 ----> if the session maintained the token will come from redis otherwise it will come from mongodb database.


------ we can send many time for register after clicking the email link then only we will get already user exists message