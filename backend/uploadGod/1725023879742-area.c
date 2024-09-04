#include <stdio.h>

int main() {
    int length, breadth, area, perimeter;

    // Take input from the user
    // printf("Enter the length of the rectangle: ");
    scanf("%d", &length);

    // printf("Enter the breadth of the rectangle: ");
    scanf("%d", &breadth);

    // Calculate the area and perimeter
    area = length * breadth;
    perimeter = 2 * (length + breadth);

    // Display the values
    printf("%d,", length);
    printf("%d,", breadth);
    printf("%d,", area);
    printf("%d", perimeter);

    return 0;
}
