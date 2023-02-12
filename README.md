# CAPS-AWS
<br>

## Caps:

## Create AWS SQS Queues:

>First, create two SQS queues: one for the vendor to send pickup requests (Pickup queue), and another for the driver to send delivery notifications (Delivered queue).

## Setting up the Vendor:

>Use the AWS SDK to create an SQS client in the vendor's code.
>Create a function that sends a pickup request to the Pickup queue. This function should generate the required event data and send it as a message to the Pickup queue.
>Call the sendPickup function in an interval using setTimeout() to send pickup requests at regular intervals.

## Setting up the Driver:

>Use the AWS SDK to create an SQS client in the driver's code.
>Create a function that listens for new messages in the Pickup queue. If a message is present, the function should receive the message, parse it, and send a delivery notification to the Delivered queue.
>Call the handlePickup() function in an interval using setTimeout() to listen for new pickup requests at regular intervals.

## Testing:

>Test the system by sending pickup requests from the vendor and verifying that delivery notifications are received by the driver.


![CAPS-CLOUD](https://i.ibb.co/XsR8CSb/caps-aws.jpg)