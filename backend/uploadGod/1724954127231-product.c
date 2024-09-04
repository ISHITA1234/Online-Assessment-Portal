#include <stdio.h>

int main() {
    float num1, num2, product;

    // Prompt the user for input
    // printf("Enter the first number: ");
    scanf("%f", &num1);

    // printf("Enter the second number: ");
    scanf("%f", &num2);

    // Calculate the product
    product = num1 * num2;

    // Display the result
    printf("%.2d\n", product);

    return 0;
}
