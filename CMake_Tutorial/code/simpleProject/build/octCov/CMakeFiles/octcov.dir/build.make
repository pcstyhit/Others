# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.16

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/pldz/share/Others/CMake_Tutorial/code/simpleProject

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/build

# Include any dependencies generated for this target.
include octCov/CMakeFiles/octcov.dir/depend.make

# Include the progress variables for this target.
include octCov/CMakeFiles/octcov.dir/progress.make

# Include the compile flags for this target's objects.
include octCov/CMakeFiles/octcov.dir/flags.make

octCov/CMakeFiles/octcov.dir/src/octCov.c.o: octCov/CMakeFiles/octcov.dir/flags.make
octCov/CMakeFiles/octcov.dir/src/octCov.c.o: ../octCov/src/octCov.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/pldz/share/Others/CMake_Tutorial/code/simpleProject/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building C object octCov/CMakeFiles/octcov.dir/src/octCov.c.o"
	cd /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/build/octCov && /home/pldz/aarch64/bin/aarch64-linux-gnu-gcc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/octcov.dir/src/octCov.c.o   -c /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/octCov/src/octCov.c

octCov/CMakeFiles/octcov.dir/src/octCov.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/octcov.dir/src/octCov.c.i"
	cd /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/build/octCov && /home/pldz/aarch64/bin/aarch64-linux-gnu-gcc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/octCov/src/octCov.c > CMakeFiles/octcov.dir/src/octCov.c.i

octCov/CMakeFiles/octcov.dir/src/octCov.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/octcov.dir/src/octCov.c.s"
	cd /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/build/octCov && /home/pldz/aarch64/bin/aarch64-linux-gnu-gcc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/octCov/src/octCov.c -o CMakeFiles/octcov.dir/src/octCov.c.s

# Object files for target octcov
octcov_OBJECTS = \
"CMakeFiles/octcov.dir/src/octCov.c.o"

# External object files for target octcov
octcov_EXTERNAL_OBJECTS =

../libs/liboctcov.a: octCov/CMakeFiles/octcov.dir/src/octCov.c.o
../libs/liboctcov.a: octCov/CMakeFiles/octcov.dir/build.make
../libs/liboctcov.a: octCov/CMakeFiles/octcov.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/pldz/share/Others/CMake_Tutorial/code/simpleProject/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking C static library ../../libs/liboctcov.a"
	cd /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/build/octCov && $(CMAKE_COMMAND) -P CMakeFiles/octcov.dir/cmake_clean_target.cmake
	cd /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/build/octCov && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/octcov.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
octCov/CMakeFiles/octcov.dir/build: ../libs/liboctcov.a

.PHONY : octCov/CMakeFiles/octcov.dir/build

octCov/CMakeFiles/octcov.dir/clean:
	cd /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/build/octCov && $(CMAKE_COMMAND) -P CMakeFiles/octcov.dir/cmake_clean.cmake
.PHONY : octCov/CMakeFiles/octcov.dir/clean

octCov/CMakeFiles/octcov.dir/depend:
	cd /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/pldz/share/Others/CMake_Tutorial/code/simpleProject /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/octCov /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/build /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/build/octCov /home/pldz/share/Others/CMake_Tutorial/code/simpleProject/build/octCov/CMakeFiles/octcov.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : octCov/CMakeFiles/octcov.dir/depend

