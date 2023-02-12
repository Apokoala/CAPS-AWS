const { sqsClient, QUEUES, chance } = require('../src/util');
const { SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs');
const startVendor = require('../src/vendor/handler').startVendor;

describe('startVendor', () => {
  let sendPickupMock;
  let deliveredMock;
  let setTimeoutMock;

  beforeEach(() => {
    sendPickupMock = jest.fn();
    deliveredMock = jest.fn();
    setTimeoutMock = jest.fn();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call sendPickup and delivered', () => {
    startVendor('test_vendor');

    expect(sendPickupMock).toHaveBeenCalled();
    expect(deliveredMock).toHaveBeenCalled();
  });

  it('should call setTimeout with correct arguments', () => {
    startVendor('test_vendor');

    expect(setTimeoutMock).toHaveBeenCalledWith(expect.any(Function), expect.any(Number));
  });
});

describe('sendPickup', () => {
  let sendMessageCommandMock;

  beforeEach(() => {
    sendMessageCommandMock = jest.fn();
    sqsClient.send = jest.fn().mockReturnValue({ MessageId: 'test_message_id' });
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call send with SendMessageCommand with correct arguments', async () => {
    const vendorId = 'test_vendor';
    await sendPickup(vendorId);

    expect(sendMessageCommandMock).toHaveBeenCalledWith({
      MessageBody: expect.any(String),
      MessageGroupId: vendorId,
      QueueUrl: QUEUES.Pickup
    });
  });

  it('should log "Vendor send pickup request!"', async () => {
    await sendPickup('test_vendor');

    expect(console.log).toHaveBeenCalledWith('Vendor send pickup request!', 'test_message_id');
  });
});