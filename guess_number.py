import random

def guess(x):
    random_number = random.randint(1, x)
    guess = 0
    while guess != random_number:
        guess = int(input(f'Guess a number between 1 and {x}: '))
        if guess < random_number:
            print('Sorry, guess again, too low!')
        elif guess > random_number:
            print('Sorry, guess again, too high!')

    print(f'You guess the correct number! It was {random_number}!')

def computer_guess(x):
    low = 1
    high = x
    feedback = ''
    while feedback != 'correct':
        if low!= high:
            guess = random.randint(low, high)
        else: guess = low
        feedback = input(f'Is the {guess} too high, low or correct? ')
        if feedback == 'high':
            high = guess - 1
        elif feedback == 'low':
            low = guess + 1

    print(f'The computer guessed your number {guess}!')


computer_guess(10)