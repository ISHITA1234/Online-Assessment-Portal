#include <stdio.h>

int main() {
    char name[50];  // Array to store the name
    char roll_number[20];  // Array to store the roll number

    // Input name from the user
    // printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);  // Read the name with spaces

    // Input roll number from the user
    // printf("Enter your roll number: ");
    fgets(roll_number, sizeof(roll_number), stdin);  // Read the roll number

    // Display name and roll number with tab and newline characters
    printf("Name:\t%s\n", name);
    printf("Roll Number:\t%s", roll_number);

    return 0;
}
