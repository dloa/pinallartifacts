package main

import (
	"bufio"
	"fmt"
	"log"
	"io/ioutil"
	"os"
	"os/exec"
	"time"
)

const IPFS_TIMEOUT time.Duration = 20

func runIpfsCommand(name string, params []string) (string, error) {
	    var output string
		var commandError error

		command := exec.Command(name, params...)
		stdout, stdoutErr := command.StdoutPipe()
		if stdoutErr != nil {
			log.Println(stdoutErr)
			commandError = stdoutErr
			return output, commandError
		}
		if cmderr := command.Start(); cmderr != nil {
			log.Println(cmderr)
			commandError = cmderr
			return output, commandError
		}
		

		done := make(chan error, 1)
		go func() {
			if stdout != nil {
				b, readErr := ioutil.ReadAll(stdout)
				if readErr != nil {
					commandError = readErr
					return
				}
				output = string(b)
			}
			done <- command.Wait()
		}()
		
		select {
			case <- time.After(IPFS_TIMEOUT * time.Second):
				if killErr := command.Process.Kill(); killErr != nil {
					log.Println(killErr)
					commandError = killErr
				}
				log.Printf("Command reached timeout and killed. %v", command.Args)
				return output, commandError
				
			case doneErr := <-done:
				if doneErr != nil {
					commandError = doneErr
					output = fmt.Sprintf("Process completed with error, %v", doneErr)
				}
		}
		
		return output, commandError
	
}


func main() {
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		lsArgs := []string{"pin", "ls", line}
		_, lsErr := runIpfsCommand("ipfs", lsArgs)
		
		var addOut string
		var addErr error
		if lsErr != nil {
			addArgs := []string{"pin", "add", line}		
		    addOut, addErr = runIpfsCommand("ipfs", addArgs)
			if addErr != nil {
				log.Printf("ipfs add error: %v -- %v", addArgs, addErr)
			}
			log.Printf("ipfs add output: %s", addOut)
		}

	}
	
	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "reading standard input:", err)
	}

}
