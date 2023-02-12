describe('handlePickup', () => {
  let receiveMessageCommandMock;
  let deleteMessageCommandMock;
  let setTimeoutMock;

  beforeEach(() => {
    receiveMessageCommandMock = jest.fn();
    deleteMessageCommandMock = jest.fn();
    setTimeoutMock = jest.fn();
    sqsClient.send = jest.fn().mockReturnValue({
      Messages: [
        {
          ReceiptHandle: 'test_receipt_handle',
          Body: JSON.stringify({ orderId: 'test_order_id' }),
        },
      ],
    });
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call setTimeout with correct arguments when there are messages', async () => {
    await handlePickup();

    expect(setTimeoutMock).toHaveBeenCalledWith(expect.any(Function), expect.any(Number));
  });
});