import random

def play():
    choice = input('Rock, Paper or Scissors? ')
    computer = random.choice(['rock','paper','scissors'])

    if choice == computer:
        return 'It\'s a tie'

    if winner(choice, computer):
        return 'You win'

    return 'You lost'

def winner(player, opponent):
    if (player == 'rock' and opponent == 'scissors') or (player == 'scissors' and opponent == 'paper') or (player == 'paper' and opponent == 'rock'):
        return True

print(play())