#include <stdio.h>

int main(int argc, char *argv[]) {
    // argc: Argument Count, number of command line arguments
    // argv: Argument Vector, array of character pointers listing all the arguments

    // Check if there are any command line arguments
    if (argc > 1) {
        printf("Command line arguments:\n");
        for (int i = 1; i < argc; i++) {
            printf("Argument %d: %s\n", i, argv[i]);
        }
    } else {
        printf("No command line arguments were provided.\n");
    }

    return 0;
}
