import asyncio
import websockets
from enum import Enum

# constants
LIMIT = 100
STATUS = Enum('STATUS', 'START PAUSE CANCEL')

total = 0
status = STATUS.CANCEL.name

async def handle_action(websocket):
    global total
    while True:
        if total == LIMIT:
            print(f'limit reached: {total}')
            await websocket.send(str(total))
            total = 0
            break

        if status == STATUS.PAUSE.name:
            print('Paused')
            break
        elif status == STATUS.CANCEL.name:
            print('Cancelled')
            total = 0
            await websocket.send(str(total))
            break
        elif status == STATUS.START.name:
            total += 1
            print(f'incrementing, total: {total}')
            await asyncio.sleep(1)
            await websocket.send(str(total))
        else:
            print(f'status not recognised, stopping...')
            break

async def handle_message(websocket):
    global status
    async for data in websocket:
        value = str(data, 'utf-8')
        print(f'message from router received: [{status}]')
        if value in STATUS._member_names_:
            status = value
            asyncio.gather(*[handle_action(websocket)])
        else:
            print(f'status not recognised stopping...')

async def main():
    async with websockets.serve(handle_message, "localhost", 2345):
        await asyncio.Future()
asyncio.run(main())