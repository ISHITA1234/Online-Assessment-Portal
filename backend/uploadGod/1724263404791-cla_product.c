#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    // // Check if the correct number of arguments is provided
    // if (argc != 3) {
    //     printf("Usage: %s <num1> <num2>\n", argv[0]);
    //     return 1; // Exit with an error code
    // }

    // Convert command line arguments from strings to integers
    int num1 = atoi(argv[1]);
    int num2 = atoi(argv[2]);

    // Calculate the product
    int product = num1 * num2;

    // Display the product
    printf("%d",product);

    return 0; // Exit with success code
}
