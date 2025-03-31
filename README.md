# SIT-request

A small application for sending/monitoring booking requests when the SIT bolig site crashes at midnight.

![alt text](/img/application.png)

## Installation

Clone the project and run:

```
npm install
npm run build
npm run start
```

Open http://localhost:3001 to access the program.

## Use

### 1. Set The access token

Copy the code to copy an access token from and head to the SIT bolig profile website. (Make sure it's logged in)

![alt text](/img/setAccessToken.png)

Open the developer console and paste the code snippet. Copy the resulting object.

![Copying the token object](/img/copyObject.png)

Paste the copied object into the "Access token" field and press submit. If successful, the name of the profile and the duration left on the token should appear.

### 2. Book Housing

Copy the housing ID into a new slot in the "Housing IDs" section.

![alt text](/img/image.png)

![alt text](/img/image-1.png)

Pressing "Book" will start an HTTP request to initiate booking. Multiple requests can be started concurrently by pressing "Book" multiple times, or pressing "Book All" to send requests for multiple Housing IDs.

![alt text](/img/image-2.png) ![alt text](/img/image-3.png) ![alt text](/img/image-4.png)

A request can be cancelled by pressing its "X" icon. The status of the requests, and related errors will be displayed.

If successful, the booking process will begin. Navigate to the SIT bolig profile page, where a link to continue the booking process will be present. The booking process will terminate an hour after it's started.